import {useEffect, useReducer} from 'react'
import usersReducer from '../reducers/UsersReducer'
import UsersContext from './../contexts/users'
import {setUsers} from './../actions/users'
import localS from './../../modules/LocalStorage'

/**
 * This provider provides user status.
 * @param {children , setIsLoading} setIsLoading Specifies the page loading status when loading information from the server.
 * @returns The output is the state and children.
 */
const UsersProvider = ({children, setIsLoading}) => {
    const [state, dispatch] = useReducer(usersReducer, {
        users: [],
        modalStatus: false,
        userIdForUpdate: null
    })

    /**
     * At the moment of initial loading of this provider, the information is read from the local storage.
     */
    useEffect(() => {
        setIsLoading(true)
        localS.allWithDelay().then(users => {
            dispatch(setUsers(users))
            setIsLoading(false)
        })
    }, [setIsLoading])

    return (
        <UsersContext.Provider value={{state, dispatch}}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider