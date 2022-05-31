import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setUsers} from '../store/slices/usersSlice'
import {setIsLoading, setIsSelectAll, setSelectedRows, setPagination} from '../store/slices/globalSlice'
import HeaderUsers from '../components/users/headerUsers'
import ModalFormUsers from '../components/users/formUsers'
import GridViewUsers from '../components/users/gridViewUsers'
import DataSetUsers from '../components/users/dataSetUsers'
import FilterUsers from '../components/users/filterUsers'
import Pagination from '../components/global/pagination'
import {getUsersService} from '../services/usersService'

const UsersPage = () => {

    const {users: {data: users}, global: {filterValue, pagination: {totalCount, pageSize, currentPage}}} = useSelector(state => state)

    const dispatch = useDispatch()

    /*
     * true: GridView, false: DataSet
     */
    const [viewType, setViewType] = useState(localStorage.viewType ? localStorage.viewType !== 'false' : true)

    useEffect(() => {
        document.title = 'کاربران'
    }, [])
    
    const changeViewType = type => {
        setViewType(type)
        localStorage.viewType = type
    }

    const pageChangeHandler = async (page) => {
        try {
            dispatch(setIsLoading(true))
            const filter = filterValue === 'all' ? '' : `${filterValue.split(':')[0]}:${filterValue.split(':')[1] === '1' ? 'true' : 'false' }`
            const {data: {data, meta: {totalDocs, limit}}} = await getUsersService(page, filter)
            dispatch(setUsers(data))
            dispatch(setIsSelectAll(false))
            dispatch(setSelectedRows([]))
            dispatch(setPagination({totalCount: totalDocs, pageSize: limit, currentPage: page}))
            window.scrollTo({top: 0, behavior: 'smooth'})
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return (
        <div className="animate-slow-1000">

            <HeaderUsers viewType={viewType} changeViewType={changeViewType} />

            <FilterUsers />

            {viewType ? <GridViewUsers users={users} /> : <DataSetUsers users={users} />}

            <Pagination filter={filterValue} onPageChange={page => pageChangeHandler(page)} currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} />

            <ModalFormUsers />
            
        </div>
    )
}

export default UsersPage