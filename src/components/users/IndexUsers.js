import {useContext, useState} from 'react'
import UsersContext from '../../states/contexts/users'
import {setUsers, setIsLoading, setIsSelectAll, setSelectedUsers} from '../../states/actions/users'
import HeaderUsers from './HeaderUsers'
import ModalFormUsers from './ModalFormUsers'
import GridViewUsers from './GridViewUsers'
import DataSetUsers from './DataSetUsers'
import Pagination from '../pagination/IndexPagination'
import FilterUsers from './FilterUsers'
import axiosUsers from '../../axios/users'

/**
 * This is the parent component for the users page.
 */
const IndexUsers = () => {

    const {state: {users, pagination: {totalCount, pageSize, currentPage}}, dispatch} = useContext(UsersContext)

    /*
     * true: GridView, false: DataSet
     */
    const [viewType, setViewType] = useState(localStorage.viewType ? localStorage.viewType !== 'false' : true)
    
    /**
     * This function is to change the display mode of information and save this mode in local storage.
     * @param type This parameter contains the type of display of user information.
     */
    const changeViewType = type => {
        setViewType(type)
        localStorage.viewType = type
    }

    const pageChangeHandler = async (page) => {
        try {
            dispatch(setIsLoading(true))
            const {data: {data, meta: {totalDocs, limit}}} = await axiosUsers.get(`/users?page=${page}`)
            dispatch(setIsSelectAll(false))
            dispatch(setSelectedUsers([]))
            dispatch(setUsers(data, {totalCount: totalDocs,pageSize: limit,currentPage: page}))
            window.scrollTo({top: 0, behavior: 'smooth'})
        } finally {
            dispatch(setIsLoading(false))
        }
    }


    return (
        <div className="container mx-auto pt-6 pb-4 px-4 md:px-2">

            <HeaderUsers viewType={viewType} changeViewType={changeViewType} />

            <FilterUsers />

            {viewType ? <GridViewUsers users={users} /> : <DataSetUsers users={users} />}

            <Pagination onPageChange={page => pageChangeHandler(page)} currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} />

            <ModalFormUsers />

        </div>
    )
}

export default IndexUsers