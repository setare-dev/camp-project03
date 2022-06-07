import {useEffect} from 'react'

const ProfilePage = () => {

    useEffect(() => {
        document.title = 'پروفایل'
    }, [])
    
    return (
        <div className="animate-slow-1000 text-gray-500 dark:text-gray-100 text-2xl font-semibold">پروفایل</div>
    )
}

export default ProfilePage