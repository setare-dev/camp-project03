import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setArticles} from '../store/slices/articlesSlice'
import {setIsLoading, setIsSelectAll, setSelectedRows, setPagination, setFilterValue} from '../store/slices/globalSlice'
import HeaderArticles from '../components/articles/headerArticles'
import ModalFormArticles from '../components/articles/formArticles'
import GridViewArticles from '../components/articles/gridViewArticles'
import DataSetArticles from '../components/articles/dataSetArticles'
import FilterArticles from '../components/articles/filterArticles'
import Pagination from '../components/global/pagination'
import {getArticlesService} from '../services/articlesService'

const ArticlesPage = () => {

    const {articles: {data: articles}, global: {filterValue, pagination: {totalCount, pageSize, currentPage}}} = useSelector(state => state)

    const dispatch = useDispatch()

    /*
     * true: GridView, false: DataSet
     */
    const [viewType, setViewType] = useState(localStorage.viewType ? localStorage.viewType !== 'false' : true)

    useEffect(() => {
        document.title = 'مقالات'
    }, [])
    
    const changeViewType = type => {
        setViewType(type)
        localStorage.viewType = type
    }

    const pageChangeHandler = async (page) => {
        try {
            dispatch(setIsLoading(true))
            const filter = filterValue === 'all' ? '' : `status:${filterValue}`
            const {data: {data, meta: {totalDocs, limit}}} = await getArticlesService(page, filter)
            dispatch(setArticles(data))
            dispatch(setIsSelectAll(false))
            dispatch(setSelectedRows([]))
            dispatch(setPagination({totalCount: totalDocs, pageSize: limit, currentPage: page}))
            window.scrollTo({top: 0, behavior: 'smooth'})
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return (
        <div className="animate-slow-1000">

            <HeaderArticles viewType={viewType} changeViewType={changeViewType} />

            <FilterArticles />

            {viewType ? <GridViewArticles articles={articles} /> : <DataSetArticles articles={articles} />}

            <Pagination filter={filterValue} onPageChange={page => pageChangeHandler(page)} currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} />

            <ModalFormArticles />
            
        </div>
    )
}

export default ArticlesPage