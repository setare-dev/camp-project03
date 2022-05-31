import {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {resetGlobalState} from '../../../store/slices/globalSlice'

const SidebarLayout = () => {

    const {isShowSidebar} = useSelector(state => state.global)

    const dispatch = useDispatch()

    const sidebarRef = useRef(null)

    useEffect(() => {
        isShowSidebar ? sidebarRef.current.classList.add('!mr-0') : sidebarRef.current.classList.remove('!mr-0')
    }, [isShowSidebar])

    const setClasses = (isActive) => {
        let classes = 'flex items-center w-full space-x-reverse space-x-2 rounded p-2 text-gray-500 dark:text-gray-100'
        classes += isActive ? ' bg-indigo-700 dark:bg-gray-700 !text-white' : ''
        return classes
    }

    const closeSidebarHandler = () => window.matchMedia('only screen and (max-width: 1024px)').matches ? dispatch(resetGlobalState({isShowSidebar: false})) : dispatch(resetGlobalState())

    return (
        <aside ref={sidebarRef} className="w-[18rem] h-full fixed top-[60px] -mr-[300px] duration-500 z-[999] bg-gray-200 dark:bg-gray-900 text-white flex flex-column justify-between">
            <div className="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto mt-6">
                <NavLink onClick={closeSidebarHandler} to="/admin/dashboard" className={({isActive}) => setClasses(isActive)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 512.009 512.009"><g><g><g><path d="M256.009,42.671c-0.002,0-0.005,0-0.007,0c-0.001,0-0.001,0-0.002,0c-0.001,0-0.002,0-0.003,0     c-70.671,0.003-134.648,28.637-180.967,74.935c-0.016,0.016-0.034,0.029-0.05,0.045c-0.017,0.017-0.03,0.035-0.047,0.052     C28.688,163.976,0.072,227.867,0.011,298.445C0.011,298.521,0,298.595,0,298.671c0,0.073,0.01,0.143,0.011,0.215     c0.05,60.201,20.962,117.239,58.515,162.704c4.053,4.907,10.084,7.748,16.448,7.748h362.048c6.364,0,12.395-2.841,16.448-7.748     c37.607-45.53,58.539-102.65,58.539-162.919C512.009,157.289,397.391,42.671,256.009,42.671z M426.68,426.671H85.316     c-23.281-30.977-37.712-67.661-41.583-106.667h62.934c11.782,0,21.333-9.551,21.333-21.333c0-11.782-9.551-21.333-21.333-21.333     H43.734c4.259-42.905,21.23-82.066,47.091-113.671l14.32,14.32c8.331,8.331,21.839,8.331,30.17,0     c8.331-8.331,8.331-21.839,0-30.17l-14.321-14.321c31.605-25.864,70.765-42.837,113.672-47.098v62.941     c0,11.782,9.551,21.333,21.333,21.333c11.782,0,21.333-9.551,21.333-21.333V86.396c42.906,4.259,82.068,21.232,113.676,47.096     l-14.325,14.325c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0l14.326-14.326     c25.867,31.607,42.842,70.771,47.103,113.677h-62.95c-11.782,0-21.333,9.551-21.333,21.333c0,11.782,9.551,21.333,21.333,21.333     h62.95C464.409,359.001,449.97,395.686,426.68,426.671z"/><polygon points="319.991,220.655 199.33,281.007 259.661,341.338    "/><path d="M320,362.671H192c-11.782,0-21.333,9.551-21.333,21.333s9.551,21.333,21.333,21.333h128     c11.782,0,21.333-9.551,21.333-21.333S331.782,362.671,320,362.671z"/></g></g></g></svg>
                    <span>داشبورد</span>
                </NavLink>

                <NavLink onClick={closeSidebarHandler} to="/admin/users" className={({isActive}) => setClasses(isActive)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                    <span>کاربران</span>
                </NavLink>

                <NavLink onClick={closeSidebarHandler} to="/admin/articles" className={({isActive}) => setClasses(isActive)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                    <span>مقالات</span>
                </NavLink>
            </div>
        </aside>
    )
}

export default SidebarLayout