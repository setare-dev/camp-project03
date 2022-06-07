import {useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setArticlesArchive, deleteArticle, setModalStatus, setIdForUpdate, setPagination, resetArticlesState} from '../store/slices/articlesSlice'
import {SUCCESSFUL_REMOVAL} from '../constants/responsesConstant'
import {getArticlesService, deleteArticleService} from '../services/articlesService'
import swal from '../modules/sweetAlert'

const UseDeleteAndUpdateArticles = (id) => {

    const {articlesCurrentPage, filterValue, pagination: {totalCount, pageSize, currentPage}} = useSelector(state => state.articles)

    const dispatch = useDispatch()

    const [isSubmit, setIsSubmit] = useState('')

    const [isSelect, setIsSelect] = useState(false)

    const [, setSearchParams] = useSearchParams()

    const getIsSubmit = (value) => isSubmit === value ? value : isSubmit !== '' ? 'false' : ''

    const deleteHandler = async () => {
        try {
            const result = await swal.question()
            if (!result) return

            setIsSubmit('delete')
            await deleteArticleService(id)
            dispatch(deleteArticle(id))

            if (articlesCurrentPage.length > 1) {
                dispatch(setPagination({pageSize, currentPage, totalCount: totalCount - 1}))
                swal.toast('success', SUCCESSFUL_REMOVAL)
                return
            }

            if (Math.ceil(totalCount / pageSize) > 1) {
                const filter = filterValue === 'all' ? '' : filterValue
                const {data: {data, meta: {totalDocs, limit, page}}} = await getArticlesService(currentPage - 1, filter)
                dispatch(resetArticlesState())
                dispatch(setArticlesArchive({page, data, totalDocs, limit}))
                setSearchParams({page: currentPage -1, filter: filterValue})
                swal.toast('success', SUCCESSFUL_REMOVAL)
            }
        } finally {
            setIsSubmit('')
        }
    }

    const updateHandler = () => {
        dispatch(setIdForUpdate(id))
        dispatch(setModalStatus(true))
    }

    return {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler}
}

export default UseDeleteAndUpdateArticles