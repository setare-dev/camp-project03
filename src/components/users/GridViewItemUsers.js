import {useState, useContext} from 'react'
import {timestampToPersianDate} from '../../modules/HelperFunctions'
import usersContext from '../../states/contexts/users'
import {deleteUser, setModalStatus, setUserIdForUpdate} from '../../states/actions/users'
import {SUCCESSFUL_REMOVAL} from '../../constants/responses'
import TableRowElement from '../elements/TableRowElement'
import TableDataElement from '../elements/TableDataElement'
import ButtonElementLoading from '../loadings/ButtonElementLoading'
import localS from '../../modules/LocalStorage'
import swal from '../../modules/SwalAlert'

/**
 * The task of this component is to create a record of users in the form of a data gridview.
 */
const GridViewItemUsers = ({id, name, family, day, month, year, gender, email, isAdmin, createdAt}) => {

    const {dispatch} = useContext(usersContext)

    const [isDeliting, setIsDeliting] = useState(false)

    /**
     * Perform user delete operations.
     */
    const deleteHandler = async () => {
        const result = await swal.question()
        if (result) {
            setIsDeliting(true)
            await localS.delete(id)
            dispatch(deleteUser(id))
            setIsDeliting(false)
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
                <div className="flex items-center mx-auto" style={{width: 100}}>
                    <button disabled={isDeliting ? 'disabled' : ''} onClick={updateHandler} className={`${isDeliting ? 'opacity-60' : 'opacity-1'} bg-green-700 text-white p-1 ml-2 text-sm rounded-md show hover:bg-green-800 focus:outline-none`}>ویرایش</button>
                    <ButtonElementLoading onClick={deleteHandler} text="حذف" isSubmit={isDeliting} size="sm" className="bg-red-600 hover:bg-red-700 focus:bg-red-700" />
                </div>
            </TableDataElement>
        </TableRowElement>
    )
}

export default GridViewItemUsers