import {useContext} from 'react'
import usersContact from '../../states/contexts/users'
import {setUsers, setFilterValue, setIsLoading, setIsSelectAll, setSelectedUsers} from '../../states/actions/users'
import StatisticsRowsUsers from './StatisticsRowsUsers'
import axiosUsers from '../../axios/users'

/**
 * This component is responsible for filtering users.
 */
const FilterUsers = () => {

    const {dispatch} = useContext(usersContact)
    
    /**
     * By changing the filter value, the desired data is captured and stored in the state, as well as the search value is stored in local storage.
     */
    const filterUsers = async ({target: {value}}) => {
        try {
            dispatch(setIsLoading(true))
            const query = value === 'all' ? '?' : `?search=${value.split(':')[0]}:${value.split(':')[1]}`
            const {data: {data, meta: {totalDocs, limit, page}}} = await axiosUsers.get(`/users${query}&page=1`)
            dispatch(setUsers(data, {totalCount: totalDocs,pageSize: limit,currentPage: page}))
            dispatch(setFilterValue(value))
            dispatch(setIsSelectAll(false))
            dispatch(setSelectedUsers([]))
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return (
        <div className="flex flex-wrap justify-between items-end">
            <select onChange={filterUsers} className="w-full mb-2 md:w-64 mt-3 p-[.66rem] rounded-lg dark:bg-gray-700 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
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