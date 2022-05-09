import {useContext, useState} from 'react'
import UsersContext from './../../contexts/users'
import {setModalStatus} from './../../actions/users'
import UserForm from './UserForm'
import GridView from './GridView'
import DataSet from './DataSet'

/**
 * This is the parent component for the users page.
 */
export default () => {
    const {dispatch} = useContext(UsersContext)

    /**
     * true: GridView, false: DataSet
     */
    const [viewType, setViewType] = useState(localStorage.viewType ? localStorage.viewType == 'false' ? false : true : true)

    /**
     * This function is to change the display mode of information and save this mode in local storage.
     * @param type This parameter contains the type of display of user information.
     */
    const changeViewType = type => {
        setViewType(type)
        localStorage.viewType = type
    }

    /**
     * Display form medal for registering a new user.
     */
    const showModalForCreateForm = () => {
        dispatch(setModalStatus(true))
        document.querySelector('body').classList.add('overflow-hidden')
    }

    return (
        <div className="container mx-auto pt-6 pb-4 px-4 md:px-2">
            <div className="flex justify-between items-center">
                <div className="flex">
                    <h4 className="text-2xl font-semibold text-gray-500 dark:text-gray-100 ml-3">لیست کاربران</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeViewType(true)} className={`${viewType ? 'text-gray-500 dark:text-gray-100' : 'text-gray-300 dark:text-gray-100/25'} h-7 cursor-pointer ml-2`} fill="currentColor" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 330 330"><path id="XMLID_469_" d="M315,30H15C6.716,30,0,36.716,0,45v60v180c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V105V45  C330,36.716,323.284,30,315,30z M150,120v60H30v-60H150z M180,120h120v60H180V120z M30,210h120v60H30V210z M180,270v-60h120v60H180z  "/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeViewType(false)} className={`${!viewType ? 'text-gray-500 dark:text-gray-100' : 'text-gray-300 dark:text-gray-100/25'} h-7 cursor-pointer`} fill="currentColor" viewBox="0 0 512 512"><path d="M204,240H68a36,36,0,0,1-36-36V68A36,36,0,0,1,68,32H204a36,36,0,0,1,36,36V204A36,36,0,0,1,204,240Z"/><path d="M444,240H308a36,36,0,0,1-36-36V68a36,36,0,0,1,36-36H444a36,36,0,0,1,36,36V204A36,36,0,0,1,444,240Z"/><path d="M204,480H68a36,36,0,0,1-36-36V308a36,36,0,0,1,36-36H204a36,36,0,0,1,36,36V444A36,36,0,0,1,204,480Z"/><path d="M444,480H308a36,36,0,0,1-36-36V308a36,36,0,0,1,36-36H444a36,36,0,0,1,36,36V444A36,36,0,0,1,444,480Z"/></svg>
                </div>
                <button onClick={showModalForCreateForm} className="bg-indigo-700 text-white px-3 py-2 rounded-lg">کاربر جدید</button>
            </div>

            {viewType ? <GridView /> : <DataSet />}
            <UserForm />
        </div>
    )
}