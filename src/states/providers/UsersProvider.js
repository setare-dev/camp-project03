import {useEffect, useReducer} from 'react'
import usersReducer from '../reducers/UsersReducer'
import UsersContext from '../contexts/users'
import {setUsers, setIsLoading} from '../actions/users'
import FullElementLoading from '../../components/loadings/FullElementLoading'
import axiosUsers from '../../axios/users'

/**
 * This provider provides user status.
 * @param {children , setIsLoading} setIsLoading Specifies the page loading status when loading information from the server.
 * @returns The output is the state and children.
 */
const UsersProvider = ({children}) => {
    const [state, dispatch] = useReducer(usersReducer, {
        users: [],
        pagination: {totalCount: 0, pageSize: 10, currentPage: 1},
        modalStatus: false,
        userIdForUpdate: null,
        filterValue: 'all',
        isLoading: false,
        selectedUsers: [],
        isSelectAll: false
    })

    /**
     * At the moment of initial loading of this provider, the information is read from the local storage.
     */
    useEffect(() => {
        dispatch(setIsLoading(true))
        axiosUsers.get('/users?page=1')
            .then(({data: {data, meta: {totalDocs: totalCount, limit: pageSize, page: currentPage}}}) => dispatch(setUsers(data, {totalCount, pageSize, currentPage})))
            .finally(() => dispatch(setIsLoading(false)))
    }, [])

    return (
        <UsersContext.Provider value={{state, dispatch}}>
            {children}
            {state.isLoading ? <FullElementLoading/> : null}
        </UsersContext.Provider>
    )
}

export default UsersProvider