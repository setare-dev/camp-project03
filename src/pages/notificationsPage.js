import {useEffect} from 'react'

const NotificationsPage = () => {

    useEffect(() => {
        document.title = 'اعلانات'
    }, [])
    
    return (
        <div className="animate-slow-1000 text-gray-500 dark:text-gray-100 text-2xl font-semibold">اعلانات</div>
    )
}

export default NotificationsPage