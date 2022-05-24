import {useContext, useEffect, useState} from 'react'
import usersContext from '../../states/contexts/users'
import {addUser, setUsers, setModalStatus, setUserIdForUpdate, updateUser} from '../../states/actions/users'
import {mapYupErrors} from '../../modules/HelperFunctions'
import {initialData, userSchema} from '../../schemas/userSchema'
import {FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION} from '../../constants/responses'
import Modal from '../modal/IndexModal'
import InputElement from '../elements/InputElement'
import MultiColumnElement from '../elements/MultiColumnElement'
import SelectElement from '../elements/SelectElement'
import DateBirthElement from '../elements/DataBirthElement'
import ButtonElementLoading from '../loadings/ButtonElementLoading'
import swal from '../../modules/SwalAlert'
import axiosUsers from '../../axios/users'

/**
 * This component is for managing the user registration form or editing.
 */
const ModalFormUsers = () => {

    const [data, setData] = useState(initialData)

    const [errors, setErrors] = useState({})

    const [isSubmit, setIsSubmit] = useState(false)

    const {state: {users, userIdForUpdate, modalStatus, filterValue, pagination}, dispatch} = useContext(usersContext)

    /**
     * Specify the form for new editing or registration.
     */
    useEffect(() => {
        if (userIdForUpdate) {
            setData({...users.filter(user => user.id === userIdForUpdate)[0], password: '', passwordConfirmation: ''})
        }
    }, [users, userIdForUpdate])

    /**
     * This function is to receive data from inputs and register it in the object.
     * @param key Contains the key to assign value in it.
     * @param value Contains a value to record in a variable.
     */
    const inputHandler = (key, value, isNumber = false) => setData({...data, [key]: isNumber ? Number(value) : value})

    /**
     * This function is to cancel the form and close it.
     */
    const cancelHandler = () => {
        setData(initialData)
        setErrors({})
        dispatch(setModalStatus(false))
        dispatch(setUserIdForUpdate(null))
    }

    /**
     * This function is for recording or editing user information.
     * @param e This parameter contains the form element.
     */
    const submitHandler = async e => {
        try {
            e.preventDefault()
            setIsSubmit(true)
            await userSchema(userIdForUpdate ? 'update' : 'create').validate(data, {abortEarly: false})
            userIdForUpdate ? await update() : await insert()
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

    /**
     * This function performs the insertion operation.
     * @returns The output of a promise is without value.
     */
    const insert = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data: resData} = await axiosUsers.post('/usersg', getDataWithoutPassConfAndId())
                match(resData)
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    /**
     * This function performs the update operation.
     * @returns The output of a promise is without value.
     */
    const update = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data: resData} = await axiosUsers.put(`/users/${data.id}`, getDataWithoutPassConfAndId())
                dispatch(updateUser(resData))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    const getDataWithoutPassConfAndId = () => Object.fromEntries(Object.entries(data).filter(([key]) => !key.includes('passwordConfirmation') && !key.includes('id')))

    const match = resData => {
        return new Promise(async resolve => {
            if (matchNewUserWithFilterValue(resData)) {
                if (users.length < pagination.pageSize) {
                    dispatch(addUser(resData))
                    return resolve()
                } else {
                    const {data: {data, meta: {totalDocs, limit, page}}} = await axiosUsers.get(`/users?page=1&sort=createdAt:1`)
                    dispatch(setUsers(data, {totalCount: totalDocs, pageSize: limit, currentPage: page}))
                    return resolve()
                }
            } else {
                return resolve()
            }
        })
    }

    const matchNewUserWithFilterValue = ({gender, isAdmin}) => {
        let [Key, value] = filterValue.split(':')
        return (Key === 'gender' && Number(value) === gender)
                || (Key === 'isAdmin' && Number(value) === isAdmin)
                    || filterValue === 'all'
    }

    return (
        <Modal modalStatus={modalStatus} cancelHandler={cancelHandler} backdrop keyboard>
            <h4 className="flex items-center text-2xl mb-8 font-semibold text-gray-500 dark:text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>{userIdForUpdate ? 'ویرایش کاربر' : 'ثبت کاربر'}</span>
            </h4>

            <form onSubmit={submitHandler}>
                <MultiColumnElement>
                    <InputElement label="نام" keyname="name" value={data.name} error={errors.name} inputHandler={inputHandler}/>
                    <InputElement label="فامیل" keyname="family" value={data.family} error={errors.family} inputHandler={inputHandler}/>
                </MultiColumnElement>

                <MultiColumnElement>
                    <DateBirthElement label="متولد" day={data.day} month={data.month} year={data.year} errors={errors} inputHandler={inputHandler}/>
                    <SelectElement label="جنسیت" keyname="gender" value={data.gender} options={[{value: 0, text: 'مرد'}, {value: 1, text: 'زن'}]} error={errors.gender} inputHandler={inputHandler}/>
                </MultiColumnElement>

                <MultiColumnElement>
                    <SelectElement label="نوع کاربری" keyname="isAdmin" value={data.isAdmin} options={[{value: 0, text: 'معمولی'}, {value: 1, text: 'مدیر'}]} error={errors.isAdmin} inputHandler={inputHandler}/>
                    <InputElement label="ایمیل" keyname="email" value={data.email} error={errors.email} inputHandler={inputHandler} dir="ltr"/>
                </MultiColumnElement>

                <MultiColumnElement>
                    <InputElement type="password" label="رمز عبور" value={data.password} keyname="password" error={errors.password} inputHandler={inputHandler} dir="ltr"/>
                    <InputElement type="password" label="تایید رمز عبور" value={data.passwordConfirmation} keyname="passwordConfirmation" error={errors.passwordConfirmation} inputHandler={inputHandler} dir="ltr"/>
                </MultiColumnElement>

                <div className="text-left mt-8 flex items-center justify-end">
                    <ButtonElementLoading text={userIdForUpdate ? 'ویرایش' : 'ثبت'} isSubmit={isSubmit} size="md" className={`${isSubmit ? 'opacity-60' : 'opacity-1'} bg-green-700 hover:bg-green-800 focus:bg-green-800`} />
                    <button disabled={isSubmit ? 'disabled' : ''} onClick={cancelHandler} type="button" className={`${isSubmit ? 'opacity-60' : 'opacity-1'} rounded-md px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:w-auto focus:bg-red-800`}>انصراف</button>
                </div>
            </form>
        </Modal>
    )
}

export default ModalFormUsers