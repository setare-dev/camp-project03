import UsersProvider from '../states/providers/UsersProvider'
import HeaderLayout from './layouts/HeaderLayout'
import FooterLayout from './layouts/FooterLayout'
import IndexUsers from './users/IndexUsers'

/**
 * The parent component that is supposed to display the user component along with the template components.
 */
const App = () => {
    return (
        <>
            <HeaderLayout/>

            <main className="relative" style={{minHeight: 'calc(100vh - 150px)'}}>
                <UsersProvider>
                    <IndexUsers/>
                </UsersProvider>
            </main>

            <FooterLayout/>
        </>
    )
}

export default App
