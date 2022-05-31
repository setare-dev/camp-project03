import {useSelector, useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import {setArticles, deleteArticle} from '../../store/slices/articlesSlice'
import {setIsLoading, setSelectedRows, setIsSelectAll, setModalStatus, setFilterValue, setPagination} from '../../store/slices/globalSlice'
import articleFactory from '../../modules/dataFactory/articleFactory'
import swal from '../../modules/sweetAlert'
import {getArticlesService, deleteArticleService} from '../../services/articlesService'
import {SUCCESSFUL_OPERATION, SUCCESSFUL_REMOVAL} from '../../constants/responsesConstant'

const HeaderArticles = ({viewType, changeViewType}) => {

    const {articles: {data: articles}, global: {filterValue, selectedRows, pagination: {totalCount, pageSize, currentPage}}} = useSelector(state => state)

    const dispatch = useDispatch()

    const lastPage = Math.ceil(totalCount / pageSize)

    const [, setSearchParams] = useSearchParams()

    const multiDeleteHandler = async () => {
        try {
            const result = await swal.question()
            if (result) {
                dispatch(setIsLoading(true))
                await deleter()
                const filter = filterValue === 'all' ? '' : filterValue
                const {data: {data, meta: {totalDocs, limit, page}}} = await getArticlesService(currentPage < lastPage ? currentPage : selectedRows.length < articles.length ? currentPage : currentPage - 1, filter)
                dispatch(setArticles(data))
                dispatch(setPagination({totalCount: totalDocs,pageSize: limit,currentPage: page}))
                dispatch(setSelectedRows([]))
                dispatch(setIsSelectAll(false))
                setSearchParams({page: currentPage - 1 > 1 ? currentPage - 1 : 1 , filter: filterValue})
                swal.toast('success', SUCCESSFUL_REMOVAL)
            }
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    const deleter = async () => {
        for (const articleId of selectedRows) {
            await deleteArticleService(articleId)
            dispatch(deleteArticle(articleId))
        }
    }

    const dataFactoryHandler = async () => {
        try {
            dispatch(setIsLoading(true))
            await articleFactory.count(20).create()
            dispatch(setFilterValue('all'))
            setSearchParams({page: 1, filter: 'all'})
            const {data: {data, meta: {totalDocs, limit, page}}} = await getArticlesService()
            dispatch(setArticles(data))
            dispatch(setPagination({totalCount: totalDocs,pageSize: limit,currentPage: page}))
            window.scrollTo({top: 0, behavior: 'smooth'})
            swal.toast('success', SUCCESSFUL_OPERATION)   
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return (
        <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center">
                <h4 className="text-2xl font-semibold text-gray-500 dark:text-gray-100 ml-3">لیست مقالات</h4>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeViewType(true)} className={`${viewType ? 'text-gray-500 dark:text-gray-100' : 'text-gray-300 dark:text-gray-100/25'} h-7 cursor-pointer ml-2`} fill="currentColor" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 330 330"><path id="XMLID_469_" d="M315,30H15C6.716,30,0,36.716,0,45v60v180c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V105V45  C330,36.716,323.284,30,315,30z M150,120v60H30v-60H150z M180,120h120v60H180V120z M30,210h120v60H30V210z M180,270v-60h120v60H180z  "/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeViewType(false)} className={`${!viewType ? 'text-gray-500 dark:text-gray-100' : 'text-gray-300 dark:text-gray-100/25'} h-7 cursor-pointer`} fill="currentColor" viewBox="0 0 512 512"><path d="M204,240H68a36,36,0,0,1-36-36V68A36,36,0,0,1,68,32H204a36,36,0,0,1,36,36V204A36,36,0,0,1,204,240Z"/><path d="M444,240H308a36,36,0,0,1-36-36V68a36,36,0,0,1,36-36H444a36,36,0,0,1,36,36V204A36,36,0,0,1,444,240Z"/><path d="M204,480H68a36,36,0,0,1-36-36V308a36,36,0,0,1,36-36H204a36,36,0,0,1,36,36V444A36,36,0,0,1,204,480Z"/><path d="M444,480H308a36,36,0,0,1-36-36V308a36,36,0,0,1,36-36H444a36,36,0,0,1,36,36V444A36,36,0,0,1,444,480Z"/></svg>
            </div>
            <div className="block md:flex items-center w-full md:w-auto md:space-x-reverse space-x-0 md:space-x-2">
                {selectedRows.length ? <button onClick={multiDeleteHandler} className="my-3 md:my-0 w-full md:w-auto order-1 md:order-2 bg-red-600 hover:bg-red-700 focus:outline-none text-white px-3 py-[0.70rem] md:py-2 rounded-lg">حذف {selectedRows.length} مقاله</button> : null}
                <button onClick={() => dispatch(setModalStatus(true))} className="my-3 md:my-0 w-full md:w-auto order-1 md:order-2 bg-indigo-700 hover:bg-indigo-800 focus:outline-none text-white px-3 py-[0.70rem] md:py-2 rounded-lg">مقاله جدید</button>
                <button onClick={dataFactoryHandler} className="my-3 md:my-0 w-full md:w-auto order-1 md:order-2 bg-gray-600 hover:bg-gray-700 focus:outline-none text-white px-3 py-[0.70rem] md:py-2 rounded-lg">مقالات فیک</button>
            </div>
        </div>
    )
}

export default HeaderArticles