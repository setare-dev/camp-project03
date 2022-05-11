import {useState} from 'react'
import UsersProvider from './../states/providers/users'
import HeaderLayout from './layouts/Header'
import FooterLayout from './layouts/Footer'
import FullElementLoading from './loadings/FullElement'
import IndexUsers from './users/Index'

/**
 * The parent component that is supposed to display the user component along with the template components.
 */
const App = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <HeaderLayout />

      <main className="relative" style={{minHeight: 'calc(100vh - 150px)'}}>
        <UsersProvider setIsLoading={setIsLoading}>
          <IndexUsers />
          {isLoading ? <FullElementLoading /> : null}
        </UsersProvider>
      </main>

      <FooterLayout />
    </>
  )
}

export default App
