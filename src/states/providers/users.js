import {useEffect, useReducer} from 'react'
import UsersReducer from './../reducers/users'
import UsersContext from './../contexts/users'
import {setUsers} from './../actions/users'
import localS from './../../modules/LocalStorage'

export default ({children, setIsLoading}) => {
    const [state, dispatch] = useReducer(UsersReducer, {
        users: [],
        modalStatus: false,
        userIdForUpdate: null
    })
    
    useEffect(() => {
        setIsLoading(true)
        localS.allWithDelay().then(users => {
          dispatch(setUsers(users))
          setIsLoading(false)
        })
    }, [])

      return (
        <UsersContext.Provider value={{state, dispatch}}>
            {children}
        </UsersContext.Provider>
      )
}