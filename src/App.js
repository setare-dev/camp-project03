import {lazy, Suspense} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import MasterLayouts from './components/layouts/masterLayouts'
import SuspenseLoading from './components/global/loadings/suspenseLoading'

const LoginPage = lazy(() => import('./pages/loginPage'))
const DashboardPage = lazy(() => import('./pages/dashboardPage'))
const UsersPage = lazy(() => import('./pages/usersPage'))
const ArticlesPage = lazy(() => import('./pages/articlesPage'))
const TodosPage = lazy(() => import('./pages/todosPage'))
const ProfilePage = lazy(() => import('./pages/profilePage'))
const SettingPage = lazy(() => import('./pages/settingPage'))
const NotificationsPage = lazy(() => import('./pages/notificationsPage'))

const App = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Suspense fallback={null}><LoginPage /></Suspense>} />
        <Route path="/admin/dashboard" element={<MasterLayouts><Suspense fallback={<SuspenseLoading />}><DashboardPage /></Suspense></MasterLayouts>} />
        <Route path="/admin/users" element={<MasterLayouts><Suspense fallback={<SuspenseLoading />}><UsersPage /></Suspense></MasterLayouts>} />
        <Route path="/admin/articles" element={<MasterLayouts><Suspense fallback={<SuspenseLoading />}><ArticlesPage /></Suspense></MasterLayouts>} />
        <Route path="/admin/todos" element={<MasterLayouts><Suspense fallback={<SuspenseLoading />}><TodosPage /></Suspense></MasterLayouts>} />
        <Route path="/admin/profile" element={<MasterLayouts><Suspense fallback={<SuspenseLoading />}><ProfilePage /></Suspense></MasterLayouts>} />
        <Route path="/admin/setting" element={<MasterLayouts><Suspense fallback={<SuspenseLoading />}><SettingPage /></Suspense></MasterLayouts>} />
        <Route path="/admin/notifications" element={<MasterLayouts><Suspense fallback={<SuspenseLoading />}><NotificationsPage /></Suspense></MasterLayouts>} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
)

export default App