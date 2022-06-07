import {useSelector, useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import {setUsersArchive, setFilterValue, resetUsersState} from '../../store/slices/usersSlice'
import {setIsLoading} from '../../store/slices/globalSlice'
import StatisticsRowsUsers from './statisticsRowsUsers'
import {getUsersService} from '../../services/usersService'

const FilterUsers = () => {

    const {filterValue} = useSelector(state => state.users)

    const dispatch = useDispatch()

    const [, setSearchParams] = useSearchParams()
    
    const filterSelectHandler = (value) => {
        dispatch(setIsLoading(true))
        const filter = value !== 'all' ? value : ''
        setSearchParams({page: 1, filter: value})
        getUsersService(1, filter !== 'all' ? filter : null).then(({data: {data, meta: {totalDocs, limit, page}}}) => {
            dispatch(resetUsersState())
            dispatch(setFilterValue(value))
            dispatch(setUsersArchive({page, data, totalDocs, limit}))
        }).finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <div className="flex flex-wrap justify-between items-end">
            <select value={filterValue} onChange={({target: {value}}) => filterSelectHandler(value)} className="w-full mb-2 md:w-64 mt-3 p-2 rounded-lg dark:bg-gray-700 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
                <option value="all">همه</option>
                <option value="gender:0">مرد</option>
                <option value="gender:1">زن</option>
                <option value="isAdmin:0">معمولی</option>
                <option value="isAdmin:1">مدیر</option>
            </select>
            <StatisticsRowsUsers />
        </div>
    )
}

export default FilterUsers