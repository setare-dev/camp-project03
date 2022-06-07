import {useEffect} from 'react'

const DashboardPage = () => {

    useEffect(() => {
        document.title = 'داشبورد'
    }, [])
    
    return (
        <div className="animate-slow-1000">
            <h4 className="text-gray-500 dark:text-gray-100 text-2xl font-semibold mb-4">داشبورد</h4>

            <div className="grid md:grid-cols-4 gap-6">
                <div className="flex justify-between items-center text-gray-400 bg-gray-100 dark:bg-gray-900 border dark:border-0 border-gray-200 px-3 py-5 rounded-lg">
                    <div>
                        <div className="text-lg font-semibold mb-2">کاربران</div>
                        <div className="text-gray-500 dark:text-gray-200 text-center text-2xl font-bold">{Number(1255).toLocaleString('fa-IR')}</div>
                    </div>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                </div>

                <div className="flex justify-between items-center text-gray-400 bg-gray-100 dark:bg-gray-900 border dark:border-0 border-gray-200 px-3 py-5 rounded-lg">
                    <div>
                        <div className="text-lg font-semibold mb-2">مقالات</div>
                        <div className="text-gray-500 dark:text-gray-200 text-center text-2xl font-bold">{Number(3781).toLocaleString('fa-IR')}</div>
                    </div>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                </div>

                <div className="flex justify-between items-center text-gray-400 bg-gray-100 dark:bg-gray-900 border dark:border-0 border-gray-200 px-3 py-5 rounded-lg">
                    <div>
                        <div className="text-lg font-semibold mb-2">کارها</div>
                        <div className="text-gray-500 dark:text-gray-200 text-center text-2xl font-bold">{Number(1202).toLocaleString('fa-IR')}</div>
                    </div>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage