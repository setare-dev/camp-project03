import {useEffect} from 'react'

const SettingPage = () => {

    useEffect(() => {
        document.title = 'تنظیمات'
    }, [])
    
    return (
        <div className="animate-slow-1000 text-gray-500 dark:text-gray-100 text-2xl font-semibold">تنظیمات</div>
    )
}

export default SettingPage