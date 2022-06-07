import {useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setUsersArchive, deleteUser, setModalStatus, setIdForUpdate, setPagination, resetUsersState} from '../store/slices/usersSlice'
import {SUCCESSFUL_REMOVAL} from '../constants/responsesConstant'
import {getUsersService, deleteUserService} from '../services/usersService'
import swal from '../modules/sweetAlert'

const UseDeleteAndUpdateUsers = (id) => {

    const {usersCurrentPage, filterValue, pagination: {totalCount, pageSize, currentPage}} = useSelector(state => state.users)

    const dispatch = useDispatch()

    const [isSubmit, setIsSubmit] = useState('')

    const [isSelect, setIsSelect] = useState(false)

    const [, setSearchParams] = useSearchParams()

    const getIsSubmit = (value) => isSubmit === value ? value : isSubmit !== '' ? 'false' : ''

    const deleteHandler = async () => {
        try {
            const result = await swal.question()
            if (!result) return

            setIsSubmit('delete')
            await deleteUserService(id)
            dispatch(deleteUser(id))

            if (usersCurrentPage.length > 1) {
                dispatch(setPagination({pageSize, currentPage, totalCount: totalCount - 1}))
                swal.toast('success', SUCCESSFUL_REMOVAL)
                return
            }

            if (Math.ceil(totalCount / pageSize) > 1) {
                const filter = filterValue === 'all' ? '' : filterValue
                const {data: {data, meta: {totalDocs, limit, page}}} = await getUsersService(currentPage - 1, filter)
                dispatch(resetUsersState())
                dispatch(setUsersArchive({page, data, totalDocs, limit}))
                setSearchParams({page: currentPage -1, filter: filterValue})
                swal.toast('success', SUCCESSFUL_REMOVAL)
            }
        } finally {
            setIsSubmit('')
        }
    }

    const updateHandler = () => {
        dispatch(setIdForUpdate(id))
        dispatch(setModalStatus(true))
    }

    return {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler}
}

export default UseDeleteAndUpdateUsers