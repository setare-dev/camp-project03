import {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setIsShowSidebar} from '../../store/slices/globalSlice'
import NavbarLayout from './sections/navbarLayout'
import SidebarLayout from './sections/sidebarLayout'
import FooterLayout from './sections/footerLayout'
import FullElementLoading from '../global/loadings/fullElementLoading'

const MasterPage = ({children}) => {

    const {isShowSidebar, isLoading} = useSelector(state => state.global)

    const dispatch = useDispatch()

    const workSpaceRef = useRef(null)

    const backDarkRef = useRef(null)

    useEffect(() => {
        isShowSidebarHandler()
        window.addEventListener('resize', () => isShowSidebarHandler())
    }, [])

    useEffect(() => {
        isShowSidebar ? workSpaceRef.current.classList.add('mr-0', 'lg:mr-[18rem]') : workSpaceRef.current.classList.remove('mr-0', 'lg:mr-[18rem]')

        if(isShowSidebar) {
            backDarkRef.current.classList.add('block')
            backDarkRef.current.classList.remove('hidden')
            matchBreakPoint() ? document.querySelector('body').classList.add('overflow-hidden') : document.querySelector('body').classList.remove('overflow-hidden')
        } else {
            backDarkRef.current.classList.add('hidden')
            backDarkRef.current.classList.remove('black')
            document.querySelector('body').classList.remove('overflow-hidden')
        }
    }, [isShowSidebar])

    const matchBreakPoint = () => window.matchMedia('only screen and (max-width: 1024px)').matches
    
    const isShowSidebarHandler = () => {
        if (matchBreakPoint()) {
            dispatch(setIsShowSidebar(false))
        } else {
            dispatch(setIsShowSidebar(true))
            document.querySelector('body').classList.remove('overflow-hidden')
        }
    }

    return (
        <div className="animate-slow-1000 select-none">

            <SidebarLayout />

            <div ref={backDarkRef} onClick={() => dispatch(setIsShowSidebar(false))} className="fixed inset-0 z-10 bg-gray-500/50 dark:bg-gray-900/50 lg:hidden"></div>

            <div ref={workSpaceRef} className="relative duration-500">
                
                <NavbarLayout />

                <main className="relative container-fluid mx-auto py-6 px-4 md:px-6 mt-[60px] min-h-[calc(100vh-116px)]">
                    {children}
                    {isLoading ? <FullElementLoading /> : null}
                </main>

                <FooterLayout />

            </div>

        </div>
    )
}

export default MasterPage