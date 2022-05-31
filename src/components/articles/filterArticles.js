import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import {setArticles} from '../../store/slices/articlesSlice'
import {setFilterValue, setIsLoading, setIsSelectAll, setPagination, setSelectedRows} from '../../store/slices/globalSlice'
import StatisticsRowsArticles from './statisticsRowsArticles'
import {getArticlesService} from '../../services/articlesService'

const FilterArticles = () => {

    const {filterValue} = useSelector(state => state.global)

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    
    useEffect(() => {
        dispatch(setIsLoading(true))
        const filter = filterValue === 'all' ? '' : `status:${filterValue}`
        setSearchParams({page: searchParams.get('page') ?? 1, filter: filterValue})
        getArticlesService(searchParams.get('page') ? searchParams.get('page') : 1, filter).then(({data: {data, meta: {totalDocs, limit, page}}}) => {
            dispatch(setArticles(data))
            dispatch(setIsSelectAll(false))
            dispatch(setSelectedRows([]))
            dispatch(setPagination({totalCount: totalDocs, pageSize: limit, currentPage: page}))
        }).finally(() => dispatch(setIsLoading(false)))
    }, [filterValue])

    return (
        <div className="flex flex-wrap justify-between items-end">
            <select value={filterValue} onChange={({target: {value}}) => {dispatch(setFilterValue(value)); setSearchParams()}} className="w-full mb-2 md:w-64 mt-3 p-[.66rem] rounded-lg dark:bg-gray-700 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
                <option value="all">همه</option>
                <option value="draft">پیش نویس</option>
                <option value="public">منتشر شده</option>
            </select>
            <StatisticsRowsArticles />
        </div>
    )
}

export default FilterArticles