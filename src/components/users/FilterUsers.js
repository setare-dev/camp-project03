import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import {setUsers} from '../../store/slices/usersSlice'
import {setFilterValue, setIsLoading, setIsSelectAll, setPagination, setSelectedRows} from '../../store/slices/globalSlice'
import StatisticsRowsUsers from './statisticsRowsUsers'
import {getUsersService} from '../../services/usersService'

const FilterUsers = () => {

    const {filterValue} = useSelector(state => state.global)

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    
    useEffect(() => {
        dispatch(setIsLoading(true))
        const filter = filterValue === 'all' ? '' : filterValue
        setSearchParams({page: searchParams.get('page') ?? 1, filter: filterValue})
        getUsersService(searchParams.get('page') ? searchParams.get('page') : 1, filter).then(({data: {data, meta: {totalDocs, limit, page}}}) => {
            dispatch(setUsers(data))
            dispatch(setIsSelectAll(false))
            dispatch(setSelectedRows([]))
            dispatch(setPagination({totalCount: totalDocs, pageSize: limit, currentPage: page}))
        }).finally(() => dispatch(setIsLoading(false)))
    }, [filterValue])

    return (
        <div className="flex flex-wrap justify-between items-end">
            <select value={filterValue} onChange={({target: {value}}) => {dispatch(setFilterValue(value)); setSearchParams()}} className="w-full mb-2 md:w-64 mt-3 p-[.66rem] rounded-lg dark:bg-gray-700 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
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