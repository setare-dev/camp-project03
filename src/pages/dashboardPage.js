import {useEffect} from 'react'

const DashboardPage = () => {

    useEffect(() => {
        document.title = 'داشبورد'
    }, [])
    
    return (
        <div className="animate-slow-1000 text-gray-500 dark:text-gray-100 text-2xl font-semibold">داشبورد</div>
    )
}

export default DashboardPage