import {useState, useEffect} from 'react'

const ScrollTopLayout = () => {

    const [isShow, setIsShow] = useState(false)

    useEffect(() => window.addEventListener('scroll', () => window.pageYOffset > 500 ? setIsShow(true) : setIsShow(false)), [])

    const scrollTopHandler = () => window.scrollTo({top:0, behavior: 'smooth'})

    return (
        <div onClick={scrollTopHandler} className={`${isShow ? 'block' : 'hidden'} fixed bottom-4 right-4 md:bottom-10 md:right-12 p-3 cursor-pointer rounded-full bg-indigo-700/75 dark:bg-gray-500/50 shadow-md text-white`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
        </div>
    )
}

export default ScrollTopLayout