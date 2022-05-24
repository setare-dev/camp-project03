import {useContext} from 'react'
import usersContext from '../../states/contexts/users'
import {setUsers, setIsLoading, deleteUser, setSelectedUsers, setIsSelectAll, setModalStatus} from '../../states/actions/users'
import userFactory from '../../modules/DataFactory/UserFactory'
import swal from '../../modules/SwalAlert'
import axiosUsers from '../../axios/users'
import {SUCCESSFUL_OPERATION, SUCCESSFUL_REMOVAL} from '../../constants/responses'

/**
 * In this component, the management is responsible for opening the user registration form and the switch between the two types of display and registration of fake information, as well as group deletion.
 */
const HeaderUsers = ({viewType, changeViewType}) => {

    const {state: {users, selectedUsers, pagination: {totalCount, pageSize, currentPage}}, dispatch} = useContext(usersContext)

    const lastPage = Math.ceil(totalCount / pageSize)

    /**
     * Has the task of group deletion of selected users.
     */
    const multiDeleteHandler = async () => {
        try {
            const result = await swal.question()
            if (result) {
                dispatch(setIsLoading(true))
                await deleter()
                const {data: {data, meta: {totalDocs, limit, page}}} = await axiosUsers.get(`/users?page=${currentPage < lastPage ? currentPage : selectedUsers.length < users.length ? currentPage : currentPage - 1}`)
                dispatch(setUsers(data, {totalCount: totalDocs,pageSize: limit,currentPage: page}))
                dispatch(setSelectedUsers([]))
                dispatch(setIsSelectAll(false))
                swal.toast('success', SUCCESSFUL_REMOVAL)
            }
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    /**
     * It is a function that starts deleting information with a loop.
     */
    const deleter = async () => {
        for (const userId of selectedUsers) {
            await axiosUsers.delete(`/users/${userId}`)
            dispatch(deleteUser(userId))
        }
    }

    /**
     * This function is responsible for creating fake data.
     */
    const dataFactoryHandler = async () => {
        try {
            dispatch(setIsLoading(true))
            await userFactory.count(20).create()
            const {data: {data, meta: {totalDocs: totalCount, limit: pageSize, page: currentPage}}} = await axiosUsers.get(`/users?page=1`)
            dispatch(setUsers(data, {totalCount, pageSize, currentPage}))
            window.scrollTo({top: 0, behavior: 'smooth'})
            swal.toast('success', SUCCESSFUL_OPERATION)   
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return (
        <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center">
                <h4 className="text-2xl font-semibold text-gray-500 dark:text-gray-100 ml-3">لیست کاربران</h4>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeViewType(true)} className={`${viewType ? 'text-gray-500 dark:text-gray-100' : 'text-gray-300 dark:text-gray-100/25'} h-7 cursor-pointer ml-2`} fill="currentColor" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 330 330"><path id="XMLID_469_" d="M315,30H15C6.716,30,0,36.716,0,45v60v180c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V105V45  C330,36.716,323.284,30,315,30z M150,120v60H30v-60H150z M180,120h120v60H180V120z M30,210h120v60H30V210z M180,270v-60h120v60H180z  "/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeViewType(false)} className={`${!viewType ? 'text-gray-500 dark:text-gray-100' : 'text-gray-300 dark:text-gray-100/25'} h-7 cursor-pointer`} fill="currentColor" viewBox="0 0 512 512"><path d="M204,240H68a36,36,0,0,1-36-36V68A36,36,0,0,1,68,32H204a36,36,0,0,1,36,36V204A36,36,0,0,1,204,240Z"/><path d="M444,240H308a36,36,0,0,1-36-36V68a36,36,0,0,1,36-36H444a36,36,0,0,1,36,36V204A36,36,0,0,1,444,240Z"/><path d="M204,480H68a36,36,0,0,1-36-36V308a36,36,0,0,1,36-36H204a36,36,0,0,1,36,36V444A36,36,0,0,1,204,480Z"/><path d="M444,480H308a36,36,0,0,1-36-36V308a36,36,0,0,1,36-36H444a36,36,0,0,1,36,36V444A36,36,0,0,1,444,480Z"/></svg>
            </div>
            <div className="block md:flex items-center w-full md:w-auto md:space-x-reverse space-x-0 md:space-x-2">
                {selectedUsers.length ? <button onClick={multiDeleteHandler} className="my-3 md:my-0 w-full md:w-auto order-1 md:order-2 bg-red-600 hover:bg-red-700 focus:outline-none text-white px-3 py-[0.70rem] md:py-2 rounded-lg">حذف {selectedUsers.length} کاربر</button> : null}
                <button onClick={() => dispatch(setModalStatus(true))} className="my-3 md:my-0 w-full md:w-auto order-1 md:order-2 bg-indigo-700 hover:bg-indigo-800 focus:outline-none text-white px-3 py-[0.70rem] md:py-2 rounded-lg">کاربر جدید</button>
                <button onClick={dataFactoryHandler} className="my-3 md:my-0 w-full md:w-auto order-1 md:order-2 bg-gray-600 hover:bg-gray-700 focus:outline-none text-white px-3 py-[0.70rem] md:py-2 rounded-lg">کاربران فیک</button>
            </div>
        </div>
    )
}

export default HeaderUsers