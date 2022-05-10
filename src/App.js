import {useState} from 'react'
import UsersProvider from './states/providers/users'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import FullElementLoading from './components/loadings/FullElement'
import Users from './components/users/Index'

export default () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <Header />

      <main className="relative" style={{minHeight: 'calc(100vh - 150px)'}}>
        <UsersProvider setIsLoading={setIsLoading}>
          <Users />
          {isLoading ? <FullElementLoading /> : null}
        </UsersProvider>
      </main>

      <Footer />
    </>
  )
}
