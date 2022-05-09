import {useEffect, useReducer, useState} from 'react'
import UsersReducer from './reducers/users'
import UsersContext from './contexts/users'
import {setUsers} from './actions/users'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import FullElementLoading from './components/loadings/FullElement'
import Users from './components/users/Index'
import localS from './modules/LocalStorage'

export default () => {
  const [state, dispatch] = useReducer(UsersReducer, {
    users: [],
    modalStatus: false,
    userIdForUpdate: null
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    localS.allWithDelay().then(users => {
      dispatch(setUsers(users))
      setIsLoading(false)
    })
  }, [])

  return (
    <>
      <Header />

      <main className="relative" style={{minHeight: 'calc(100vh - 150px)'}}>
        <UsersContext.Provider value={{state, dispatch}}>
          <Users />
          {isLoading ? <FullElementLoading /> : null}
        </UsersContext.Provider>
      </main>

      <Footer />
    </>
  )
}
