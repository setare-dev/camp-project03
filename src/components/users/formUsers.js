import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import useForm from '../../hooks/useForm'
import {updateUser, setUsers} from '../../store/slices/usersSlice'
import {setModalStatus, setIdForUpdate, setFilterValue, setPagination} from '../../store/slices/globalSlice'
import {initialData, userSchema} from '../../schemas/userSchema'
import {FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION} from '../../constants/responsesConstant'
import Modal from '../global/modal/mainModal'
import {InputElement, SelectElement, DateBirthElement, MultiColumnElement} from '../global/elements/formElement'
import ButtonElementLoading from '../global/loadings/buttonElementLoading'
import swal from '../../modules/sweetAlert'
import {getUsersService, createUserService, updateUserService} from '../../services/usersService'

/**
 * This component is for managing the user registration form or editing.
 */
const FormUsers = () => {

    const {data, setData, errors, setErrors, mapYupErrors, isSubmit, setIsSubmit, inputHandler} = useForm(initialData)

    const {users: {data: users}, global: {idForUpdate, modalStatus}} = useSelector(state => state)

    const dispatch = useDispatch()

    /**
     * Specify the form for new editing or registration.
     */
    useEffect(() => {
        if (idForUpdate) {
            setData({...users.filter(({id}) => id === idForUpdate)[0], password: '', passwordConfirmation: ''})
        }
    }, [idForUpdate])

    const cancelHandler = () => {
        setData(initialData)
        setErrors({})
        dispatch(setModalStatus(false))
        dispatch(setIdForUpdate(null))
    }

    const submitHandler = async e => {
        try {
            e.preventDefault()
            setIsSubmit(true)
            await userSchema(idForUpdate ? 'update' : 'create').validate(data, {abortEarly: false})
            idForUpdate ? await update() : await insert()
            cancelHandler()
            swal.toast('success', SUCCESSFUL_OPERATION)
        } catch (errors) {
            if (errors?.name === 'AxiosError') return swal.toast('error', AXIOS_ERROR)
            setErrors(mapYupErrors(errors))
            swal.toast('error', FORM_ERRORS)
        } finally {
            setIsSubmit(false)
        }
    }

    const insert = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await createUserService({...data, createdAt: Date.now()})
                dispatch(setFilterValue('all'))
                const {data: {data: resData, meta: {totalDocs, limit, page}}} = await getUsersService()
                dispatch(setUsers(resData))
                dispatch(setPagination({totalCount: totalDocs, pageSize: limit, currentPage: page}))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    const update = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await updateUserService(data)
                dispatch(updateUser(data))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    return (
        <Modal modalStatus={modalStatus} cancelHandler={cancelHandler} keyboard>
            <h4 className="flex items-center text-2xl mb-8 font-semibold text-gray-500 dark:text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>{idForUpdate ? 'ویرایش کاربر' : 'ثبت کاربر'}</span>
            </h4>

            <form onSubmit={submitHandler}>
                <MultiColumnElement>
                    <InputElement label="نام" keyname="name" value={data.name} error={errors.name} inputHandler={inputHandler} />
                    <InputElement label="فامیل" keyname="family" value={data.family} error={errors.family} inputHandler={inputHandler} />
                </MultiColumnElement>

                <MultiColumnElement>
                    <DateBirthElement label="متولد" day={data.day} month={data.month} year={data.year} errors={errors} inputHandler={inputHandler} />
                    <SelectElement label="جنسیت" keyname="gender" value={data.gender} type="number" options={[{value: 0, text: 'مرد'}, {value: 1, text: 'زن'}]} error={errors.gender} inputHandler={inputHandler} />
                </MultiColumnElement>

                <MultiColumnElement>
                    <SelectElement label="نوع کاربری" keyname="isAdmin" value={data.isAdmin} type="number" options={[{value: 0, text: 'معمولی'}, {value: 1, text: 'مدیر'}]} error={errors.isAdmin} inputHandler={inputHandler} />
                    <InputElement label="ایمیل" keyname="email" value={data.email} error={errors.email} inputHandler={inputHandler} dir="ltr" />
                </MultiColumnElement>

                <MultiColumnElement>
                    <InputElement type="password" label="رمز عبور" value={data.password} keyname="password" error={errors.password} inputHandler={inputHandler} dir="ltr" />
                    <InputElement type="password" label="تایید رمز عبور" value={data.passwordConfirmation} keyname="passwordConfirmation" error={errors.passwordConfirmation} inputHandler={inputHandler} dir="ltr" />
                </MultiColumnElement>

                <div className="text-left mt-8 flex items-center justify-end">
                    <ButtonElementLoading text={idForUpdate ? 'ویرایش' : 'ثبت'} isSubmit={isSubmit} size="md" className={`${isSubmit ? 'opacity-60' : 'opacity-1'} bg-green-700 hover:bg-green-800 focus:bg-green-800`} />
                    <button disabled={isSubmit ? 'disabled' : ''} onClick={cancelHandler} type="button" className={`${isSubmit ? 'opacity-60' : 'opacity-1'} rounded-md px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:w-auto focus:bg-red-800`}>انصراف</button>
                </div>
            </form>
        </Modal>
    )
}

export default FormUsers