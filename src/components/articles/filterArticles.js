import {useSelector, useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import {setArticlesArchive, setFilterValue, resetArticlesState} from '../../store/slices/articlesSlice'
import {setIsLoading} from '../../store/slices/globalSlice'
import StatisticsRowsArticles from './statisticsRowsArticles'
import {getArticlesService} from '../../services/articlesService'

const FilterArticles = () => {

    const {filterValue} = useSelector(state => state.articles)

    const dispatch = useDispatch()

    const [, setSearchParams] = useSearchParams()
    
    const filterSelectHandler = (value) => {
        dispatch(setIsLoading(true))
        const filter = value !== 'all' ? value : ''
        setSearchParams({page: 1, filter: filter })
        getArticlesService(1, filter !== 'all' ? filter : null).then(({data: {data, meta: {totalDocs, limit, page}}}) => {
            dispatch(resetArticlesState())
            dispatch(setFilterValue(value))
            dispatch(setArticlesArchive({page, data, totalDocs, limit}))
        }).finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <div className="flex flex-wrap justify-between items-end">
            <select value={filterValue} onChange={({target: {value}}) => filterSelectHandler(value)} className="w-full mb-2 md:w-64 mt-3 p-2 rounded-lg dark:bg-gray-700 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
                <option value="all">همه</option>
                <option value="status:draft">پیش نویس</option>
                <option value="status:public">منتشر شده</option>
            </select>
            <StatisticsRowsArticles />
        </div>
    )
}

export default FilterArticles