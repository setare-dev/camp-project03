import {useEffect, useReducer} from 'react'
import UsersReducer from './reducers/users'
import UsersContext from './contexts/users'
import {setUsers} from './actions/users'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Users from './components/users/Index'
import localS from './modules/LocalStorage'

export default () => {
  const [state, dispatch] = useReducer(UsersReducer, {
    users: [],
    modalStatus: false,
    userIdForUpdate: null
  })

  useEffect(() => dispatch(setUsers(localS.all())), [])

  return (
    <>
      <Header />

      <main style={{minHeight: 'calc(100vh - 150px)'}}>
        <UsersContext.Provider value={{state, dispatch}}>
          <Users />  
        </UsersContext.Provider>
      </main>

      <Footer />
    </>
  )
}
