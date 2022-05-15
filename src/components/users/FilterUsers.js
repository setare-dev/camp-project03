import { useContext, useEffect } from 'react'
import usersContact from '../../states/contexts/users'
import {setUsers, setFilterValue, setIsLoading} from '../../states/actions/users'
import LocalS from '../../modules/LocalStorage'

/**
 * This component is responsible for filtering users.
 */
const FilterUsers = () => {

    const {state: {users, filterValue}, dispatch} = useContext(usersContact)
    
    /**
     * By changing the filter value, the desired data is captured and stored in the state, as well as the search value is stored in local storage.
     */
    useEffect(() => {
        dispatch(setIsLoading(true))
        LocalS.search(filterValue.split(':')[0], filterValue.split(':')[1])
            .then(users => {
                dispatch(setUsers(users))
                dispatch(setIsLoading(false))
                localStorage.filterValue = filterValue
                window.scrollTo({top: 0, behavior: 'smooth'})
            })
    }, [filterValue, dispatch])

    return (
        <div className="flex flex-wrap justify-between items-end">
            <select value={filterValue} onChange={({target: {value}}) => dispatch(setFilterValue(value))} className="w-full mb-2 md:w-64 mt-3 p-[.66rem] rounded-lg dark:bg-gray-700 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
                <option value="all">همه</option>
                <option value="gender:0">مرد</option>
                <option value="gender:1">زن</option>
                <option value="isAdmin:0">معمولی</option>
                <option value="isAdmin:1">مدیر</option>
            </select>

            {/** Displays the number of users searched.*/}
            <div className="text-gray-500 dark:text-gray-300 space-x-reverse space-x-2 mt-3 md:mt-0">
                {(users.length && localStorage.filterValue !== 'all') ? <><span className="font-semibold">{users.length}</span><span>نتیجه از</span></> : null}
                {users.length ? <><span className="font-semibold">{localStorage.total}</span><span>رکورد</span></> : null}
            </div>
        </div>
    )
}

export default FilterUsers