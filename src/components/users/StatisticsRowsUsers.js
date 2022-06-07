import {useSelector} from 'react-redux'

const StatisticsRowsUsers = () => { 

    const {usersCurrentPage: users, pagination: {totalCount, pageSize, currentPage}} = useSelector(state => state.users)

    const hasNext = currentPage < Math.ceil(totalCount / pageSize)

    return (
        <>
            {
                totalCount > pageSize
                    ?
                        <div className="text-gray-500 dark:text-gray-300 text-center md:text-right space-x-reverse space-x-1 pt-2">
                            <span>سطر</span>
                                <span className="font-semibold">{((pageSize * (currentPage - 1)) + 1).toLocaleString('fa-IR')}</span>
                            <span>تا سطر</span>
                                <span className="font-semibold">{(hasNext ? (pageSize * currentPage) : ((pageSize * (currentPage - 1)) + 1) + users.length - 1).toLocaleString('fa-IR') }</span>
                            <span>از</span>
                                <span className="font-semibold">{totalCount.toLocaleString('fa-IR')}</span>
                            <span>نتیجه</span>
                        </div>
                : null
            }
        </>
    )
}

export default StatisticsRowsUsers