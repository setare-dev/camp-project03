import {useContext} from 'react'
import {timestampToPersianDate} from '../../modules/HelperFunctions'
import usersContext from '../../states/contexts/users'
import {deleteUser, setModalStatus, setUserIdForUpdate} from '../../states/actions/users'
import {SUCCESSFUL_REMOVAL} from '../../constants/responses'
import TableRowElement from '../elements/TableRowElement'
import TableDataElement from '../elements/TableDataElement'
import localS from '../../modules/LocalStorage'
import swal from '../../modules/SwalAlert'

/**
 * The task of this component is to create a record of users in the form of a data gridview.
 */
const GridViewItemUsers = ({id, name, family, day, month, year, gender, email, isAdmin, createdAt}) => {
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
        document.querySelector('body').classList.add('overflow-hidden')
    }

    return (
        <TableRowElement>
            <TableDataElement>{name} {family}</TableDataElement>
            <TableDataElement>{year}/{month}/{day}</TableDataElement>
            <TableDataElement>{gender === '0' ? 'مرد' : 'زن'}</TableDataElement>
            <TableDataElement>{email}</TableDataElement>
            <TableDataElement>{isAdmin === '0' ? 'معمولی' : 'مدیر'}</TableDataElement>
            <TableDataElement>{timestampToPersianDate(createdAt)}</TableDataElement>
            <TableDataElement>
                <button onClick={updateHandler} className="bg-green-700 text-white p-1 ml-2 text-sm rounded-md show hover:bg-green-800 focus:outline-none">ویرایش</button>
                <button onClick={deleteHandler} className="bg-red-600 text-white p-1 text-sm rounded-md delete hover:bg-red-700 focus:outline-none">حذف</button>
            </TableDataElement>
        </TableRowElement>
    )
}

export default GridViewItemUsers