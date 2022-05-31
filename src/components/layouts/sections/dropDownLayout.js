import {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {setIsShowSidebar} from '../../../store/slices/globalSlice'
import DropDownItemElement from '../../global/elements/dropDownItemElement'

const DropDownLayout = () => {

    const dispatch = useDispatch()
    
    const [isShow, setIsShow] = useState(false)

    const dropDownRef = useRef(null)

    const clickOutsideHandler = ({target}) => dropDownRef.current && !dropDownRef.current.contains(target) ? setIsShow(false) : null

    useEffect(() => {
        if (window.matchMedia('only screen and (max-width: 1024px)').matches) dispatch(setIsShowSidebar(false))
    }, [isShow])

    useEffect(() => {
        document.addEventListener("mousedown", clickOutsideHandler)
        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        }
    }, [])

    return (
        <div ref={dropDownRef} className="relative">

            <svg onClick={() => setIsShow(!isShow)} xmlns="http://www.w3.org/2000/svg" className="h-[1.4rem] w-[1.4rem] text-gray-500 dark:text-gray-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>

            <div onClick={() => setIsShow(false)} className={`${isShow ? 'block' : 'hidden'} fixed inset-0 top-[60px] animate-slow-200 bg-gray-900/50`}></div>

            <div className={`${isShow ? 'block' : 'hidden'} origin-top-left absolute left-2 top-5 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-gray-700 focus:outline-none animate-slow-200`}>
                <DropDownItemElement position="top">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                    <span>پروفایل</span>
                </DropDownItemElement>

                <DropDownItemElement>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                    <span>تنظیمات</span>
                </DropDownItemElement>

                <DropDownItemElement position="bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    <span>خروج</span>
                </DropDownItemElement>
            </div>
            
        </div>
    )
}

export default DropDownLayout