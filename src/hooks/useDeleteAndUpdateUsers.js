import {useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setIsSelectAll, setSelectedRows, setModalStatus, setIdForUpdate, setPagination} from '../store/slices/globalSlice'
import {setUsers, deleteUser} from '../store/slices/usersSlice'
import {SUCCESSFUL_REMOVAL} from '../constants/responsesConstant'
import {getUsersService, deleteUserService} from '../services/usersService'
import swal from '../modules/sweetAlert'

const UseDeleteAndUpdateUsers = (id) => {

    const {users, global: {filterValue, pagination: {totalCount, pageSize, currentPage}}} = useSelector(state => state)

    const dispatch = useDispatch()

    const [isDeliting, setIsDeliting] = useState(false)

    const [isSelect, setIsSelect] = useState(false)

    const [, setSearchParams] = useSearchParams()

    const deleteHandler = async () => {
        try {
            const result = await swal.question()
            if (!result) return

            setIsDeliting(true)
            await deleteUserService(id)
            dispatch(deleteUser(id))

            if (users.length > 1) {
                dispatch(setPagination({pageSize, currentPage, totalCount: totalCount - 1}))
                swal.toast('success', SUCCESSFUL_REMOVAL)
                return
            }

            if (Math.ceil(totalCount / pageSize) > 1) {
                const filter = filterValue === 'all' ? '' : `${filterValue.split(':')[0]}:${filterValue.split(':')[1] === '1' ? 'true' : 'false' }`
                const {data: {data, meta: {totalDocs, limit, page}}} = await getUsersService(currentPage - 1, filter)
                dispatch(setUsers(data))
                dispatch(setIsSelectAll(false))
                dispatch(setSelectedRows([]))
                dispatch(setPagination({totalCount: totalDocs,pageSize: limit,currentPage: page}))
                setSearchParams({page: currentPage -1, filter: filterValue})
                swal.toast('success', SUCCESSFUL_REMOVAL)
            }
        } finally {
            setIsDeliting(false)
        }
    }

    const updateHandler = () => {
        dispatch(setIdForUpdate(id))
        dispatch(setModalStatus(true))
    }

    return {isDeliting, isSelect, setIsSelect, deleteHandler, updateHandler}
}

export default UseDeleteAndUpdateUsers