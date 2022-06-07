import {useSearchParams} from 'react-router-dom'
import {usePagination, DOTS} from './usePagination'

const Pagination = ({onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, filter = 'all'}) => {

    const paginationRange = usePagination({currentPage, totalCount, siblingCount, pageSize})

    const [, setSearchParams] = useSearchParams()

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) return null

    const pageChangeHandler = (page) => {
        setSearchParams({page, filter})
        onPageChange(page)
    }

    const onNext = () => pageChangeHandler(currentPage + 1)

    const onPrevious = () => pageChangeHandler(currentPage - 1)

    const hasPrevious = currentPage > 1

    const lastPage = paginationRange[paginationRange.length - 1]

    const hasNext = currentPage < lastPage

    return (
        <ul className="flex items-center justify-between md:justify-start mt-8 mb-4 select-none">

            {/* Left navigation arrow */}
            <li onClick={() => hasPrevious ? onPrevious() : null} className={`${hasPrevious ? 'cursor-pointer hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500' : 'cursor-default opacity-40'} text-gray-600 dark:text-gray-100 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md ml-1 select-none duration-300`}>
                قبلی
            </li>

            {
                paginationRange.map((pageNumber, index) => {
                
                    // If the pageItem is a DOT, render the DOTS unicode character
                    if (pageNumber === DOTS) {
                        return <li key={index} className="px-3 text-gray-600 dark:text-gray-100 hidden md:block select-none">. . .</li>
                    }
                    
                    // Render our Page Pills
                    return (
                        <li key={index} onClick={() => pageChangeHandler(pageNumber)} className={`${pageNumber === currentPage ? '!bg-indigo-700 !text-white select-none' : ''} px-4 py-2 text-gray-600 dark:text-gray-100 mx-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 rounded-md hidden md:block select-none cursor-pointer duration-300`}>
                            {pageNumber.toLocaleString('fa-IR')}
                        </li>
                    )
                })
            }

            {/*  Right Navigation arrow */}
            <li onClick={() => hasNext ? onNext() : null} className={`${hasNext ? 'cursor-pointer hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500' : 'cursor-default opacity-40'} text-gray-600 dark:text-gray-100 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md mr-1 select-none duration-300`}>
                بعدی
            </li>
        </ul>
    )
}

export default Pagination