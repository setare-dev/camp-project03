import {useState, useContext} from 'react'
import {timestampToPersianDate} from '../../modules/HelperFunctions'
import usersContext from '../../states/contexts/users'
import {setUsers, setIsSelectAll, setSelectedUsers, deleteUser, setModalStatus, setUserIdForUpdate, setPagination} from '../../states/actions/users'
import {SUCCESSFUL_REMOVAL} from '../../constants/responses'
import TableRowElement from '../elements/TableRowElement'
import TableDataElement from '../elements/TableDataElement'
import ButtonElementLoading from '../loadings/ButtonElementLoading'
import GridViewItemSelectUsers from './GridViewItemSelectUsers'
import axiosUsers from '../../axios/users'
import swal from '../../modules/SwalAlert'

/**
 * The task of this component is to create a record of users in the form of a data gridview.
 */
const GridViewItemUsers = ({id, name, family, day, month, year, gender, email, isAdmin, createdAt}) => {

    const {state: {users, pagination: {totalCount, pageSize, currentPage}}, dispatch} = useContext(usersContext)

    const [isDeliting, setIsDeliting] = useState(false)

    const [isSelect, setIsSelect] = useState(false)

    /**
     * Perform user delete operations.
     */
    const deleteHandler = async () => {
        try {
            const result = await swal.question()
            if (result) {
                setIsDeliting(true)
                await axiosUsers.delete(`/users/${id}`)
                dispatch(deleteUser(id))
                if (users.length > 1) {
                    dispatch(setPagination({pageSize, currentPage, totalCount: totalCount - 1}))
                } else {
                    if (Math.ceil(totalCount / pageSize) > 1) {
                        const {data: {data, meta: {totalDocs, limit, page}}} = await axiosUsers.get(`/users?page=${currentPage - 1}`)
                        dispatch(setUsers(data, {totalCount: totalDocs,pageSize: limit,currentPage: page}))
                        dispatch(setIsSelectAll(false))
                        dispatch(setSelectedUsers([]))
                    }
                }
                swal.toast('success', SUCCESSFUL_REMOVAL)
            }
        } finally {
            setIsDeliting(false)
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
        <TableRowElement isSelect={isSelect}>
            <TableDataElement>
                <GridViewItemSelectUsers userId={id} isSelect={isSelect} setIsSelect={setIsSelect} />
            </TableDataElement>
            <TableDataElement>{name} {family}</TableDataElement>
            <TableDataElement>{year}/{month}/{day}</TableDataElement>
            <TableDataElement>{gender ? 'زن' : 'مرد'}</TableDataElement>
            <TableDataElement>{email}</TableDataElement>
            <TableDataElement>{isAdmin ? 'مدیر' : 'معمولی'}</TableDataElement>
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