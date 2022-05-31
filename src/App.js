import {lazy, Suspense} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import MasterPage from './components/layouts/masterPage'
import SuspenseLoading from './components/global/loadings/suspenseLoading'

const DashboardPage = lazy(() => import('./pages/dashboardPage'))
const UsersPage = lazy(() => import('./pages/usersPage'))
const ArticlesPage = lazy(() => import('./pages/articlesPage'))

const App = () => {
    return (
        <MasterPage>
            <Routes>
                <Route path="/admin/dashboard" element={<Suspense fallback={<SuspenseLoading />}><DashboardPage /></Suspense>} />
                <Route path="/admin/users" element={<Suspense fallback={<SuspenseLoading />}><UsersPage /></Suspense>} />
                <Route path="/admin/articles" element={<Suspense fallback={<SuspenseLoading />}><ArticlesPage /></Suspense>} />
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </Routes>
        </MasterPage>
    )
}

export default App