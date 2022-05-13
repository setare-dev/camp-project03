import {useContext} from 'react'
import {timestampToPersianDate} from '../../modules/HelperFunctions'
import usersContext from '../../states/contexts/users'
import {deleteUser, setModalStatus, setUserIdForUpdate} from '../../states/actions/users'
import {SUCCESSFUL_REMOVAL} from '../../constants/responses'
import DataSetRowElement from '../elements/DataSetRowElement'
import localS from '../../modules/LocalStorage'
import swal from '../../modules/SwalAlert'

/**
 * The task of this component is to create a record of users in the form of a data set.
 */
const DataSetItemUsers = ({id, name, family, day, month, year, gender, email, isAdmin, createdAt}) => {
    const {dispatch} = useContext(usersContext)

    /**
     * Perform user delete operations.
     */
    const deleteHandler = async () => {
        const result = await swal.question()
        if (result) {
            localS.delete(id)
            dispatch(deleteUser(id))
            swal.toast('success', SUCCESSFUL_REMOVAL)
        }
    }

    /**
     * Perform user editing operations.
     */
    const updateHandler = () => {
        dispatch(setUserIdForUpdate(id))
        dispatch(setModalStatus(true))
    }

    return (
        <div className="bg-gray-200 dark:bg-gray-900 p-3 rounded-lg space-y-3">
            <DataSetRowElement className="text-lg font-semibold">
                <div className="ml-1">{gender === '0' ? 'آقای' : 'خانم'}</div>
                <div className="ml-1">{name}</div>
                <div>{family}</div>
            </DataSetRowElement>

            <DataSetRowElement>
                <div className="ml-1 opacity-60">متولد</div>
                <div>{year}/{month}/{day}</div>
            </DataSetRowElement>

            <DataSetRowElement>
                <div className="ml-1 opacity-60">نوع کاربری</div>
                <div>{isAdmin === "0" ? 'معمولی' : 'مدیر'}</div>
            </DataSetRowElement>

            <DataSetRowElement>
                <div className="ml-1 opacity-60">تاریخ عضویت</div>
                <div>{timestampToPersianDate(createdAt)}</div>
            </DataSetRowElement>

            <DataSetRowElement className="text-left">
                {email}
            </DataSetRowElement>

            <div className="grid grid-cols-2">
                <button onClick={updateHandler} className="bg-green-700 text-white p-2 text-sm rounded-r-md hover:bg-green-800 focus:outline-none">ویرایش</button>
                <button onClick={deleteHandler} className="bg-red-600 text-white p-2 text-sm rounded-l-md hover:bg-red-700 focus:outline-none">حذف</button>
            </div>
        </div>
    )
}

export default DataSetItemUsers