import {useSelector, useDispatch} from 'react-redux'
import {setIsShowSidebar} from '../../../store/slices/globalSlice'

const HamburgerLayout = () => {

    const {isShowSidebar} = useSelector(state => state.global)

    const dispatch = useDispatch()

    return (
        <div className="flex items-center text-gray-800 dark:text-gray-100">
            <svg onClick={() => dispatch(setIsShowSidebar(!isShowSidebar))} className="w-9 h-9 ml-3 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h7" /></svg>
            <span className="text-xl select-none">پنل مدیریت</span>
        </div>
    )
}

export default HamburgerLayout