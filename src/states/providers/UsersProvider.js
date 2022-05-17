import {useEffect, useReducer} from 'react'
import usersReducer from '../reducers/UsersReducer'
import UsersContext from '../contexts/users'
import {setUsers, setIsLoading} from '../actions/users'
import localS from '../../modules/LocalStorage'
import FullElementLoading from '../../components/loadings/FullElementLoading'

/**
 * This provider provides user status.
 * @param {children , setIsLoading} setIsLoading Specifies the page loading status when loading information from the server.
 * @returns The output is the state and children.
 */
const UsersProvider = ({children}) => {
    const [state, dispatch] = useReducer(usersReducer, {
        users: [],
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
        localS.allWithDelay().then(users => {
            dispatch(setUsers(users))
            dispatch(setIsLoading(false))
        })
    }, [])

    return (
        <UsersContext.Provider value={{state, dispatch}}>
            {children}
            {state.isLoading ? <FullElementLoading/> : null}
        </UsersContext.Provider>
    )
}

export default UsersProvider