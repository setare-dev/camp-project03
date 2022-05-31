import {useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setIsSelectAll, setSelectedRows, setModalStatus, setIdForUpdate, setPagination} from '../store/slices/globalSlice'
import {setArticles, deleteArticle} from '../store/slices/articlesSlice'
import {SUCCESSFUL_REMOVAL} from '../constants/responsesConstant'
import {getArticlesService, deleteArticleService} from '../services/articlesService'
import swal from '../modules/sweetAlert'

const UseDeleteAndUpdateArticles = (id) => {

    const {articles, global: {filterValue, pagination: {totalCount, pageSize, currentPage}}} = useSelector(state => state)

    const dispatch = useDispatch()

    const [isDeliting, setIsDeliting] = useState(false)

    const [isSelect, setIsSelect] = useState(false)

    const [, setSearchParams] = useSearchParams()

    const deleteHandler = async () => {
        try {
            const result = await swal.question()
            if (!result) return

            setIsDeliting(true)
            await deleteArticleService(id)
            dispatch(deleteArticle(id))

            if (articles.length > 1) {
                dispatch(setPagination({pageSize, currentPage, totalCount: totalCount - 1}))
                swal.toast('success', SUCCESSFUL_REMOVAL)
                return
            }

            if (Math.ceil(totalCount / pageSize) > 1) {
                const filter = filterValue === 'all' ? '' : filterValue
                const {data: {data, meta: {totalDocs, limit, page}}} = await getArticlesService(currentPage - 1, filter)
                dispatch(setArticles(data))
                dispatch(setPagination({totalCount: totalDocs, pageSize: limit, currentPage: page}))
                dispatch(setIsSelectAll(false))
                dispatch(setSelectedRows([]))
                setSearchParams({page: currentPage -1, filter: filterValue})
                swal.toast('success', SUCCESSFUL_REMOVAL)
            }
        } finally {
            setIsDeliting(false)
        }
    }

    const updateHandler = () => {
        dispatch(setIdForUpdate(id))
        dispatch(setModalStatus(true))
    }

    return {isDeliting, isSelect, setIsSelect, deleteHandler, updateHandler}
}

export default UseDeleteAndUpdateArticles