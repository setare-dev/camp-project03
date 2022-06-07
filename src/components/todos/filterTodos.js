import {useSelector, useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import {setTodosArchive, setFilterValue, resetTodosState} from '../../store/slices/todosSlice'
import {setIsLoading} from '../../store/slices/globalSlice'
import StatisticsRowsTodos from './statisticsRowsTodos'
import {getTodosService} from '../../services/todosService'

const FilterTodos = () => {

    const {filterValue} = useSelector(state => state.todos)

    const dispatch = useDispatch()

    const [, setSearchParams] = useSearchParams()
    
    const filterSelectHandler = (value) => {
        dispatch(setIsLoading(true))
        const filter = value !== 'all' ? value : ''
        setSearchParams({page: 1, filter})
        getTodosService(1, filter !== 'all' ? filter : null).then(({data: {data, meta: {totalDocs, limit, page}}}) => {
            dispatch(resetTodosState())
            dispatch(setFilterValue(value))
            dispatch(setTodosArchive({page, data, totalDocs, limit}))
        }).finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <div className="flex flex-wrap justify-between items-end">
            <select value={filterValue} onChange={({target: {value}}) => filterSelectHandler(value)} className="w-full mb-2 md:w-64 mt-3 p-2 rounded-lg dark:bg-gray-700 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
                <option value="all">همه</option>
                <option value="done:1">تکمیل شده</option>
                <option value="done:0">تکمیل نشده</option>
            </select>
            <StatisticsRowsTodos />
        </div>
    )
}

export default FilterTodos