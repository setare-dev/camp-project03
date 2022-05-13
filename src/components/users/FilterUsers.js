import { useContext, useEffect } from 'react'
import usersContact from '../../states/contexts/users'
import {setUsers, setFilterValue, setIsLoading} from '../../states/actions/users'
import LocalS from '../../modules/LocalStorage'

const FilterUsers = () => {

    const {state: {filterValue}, dispatch} = useContext(usersContact)
    
    useEffect(() => {
        dispatch(setIsLoading(true))
        LocalS.search(filterValue.split(':')[0], filterValue.split(':')[1])
            .then(users => {
                dispatch(setIsLoading(false))
                dispatch(setUsers(users))
                window.scrollTo({top: 0, behavior: 'smooth'})
            })
    }, [filterValue, dispatch])

    return (
        <select value={filterValue} onChange={({target: {value}}) => dispatch(setFilterValue(value))} className="w-full mb-2 md:w-64 mt-3 p-[.66rem] rounded-lg dark:bg-gray-700 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
            <option value="all">همه</option>
            <option value="gender:0">مرد</option>
            <option value="gender:1">زن</option>
            <option value="isAdmin:0">معمولی</option>
            <option value="isAdmin:1">مدیر</option>
        </select>
    )
}

export default FilterUsers