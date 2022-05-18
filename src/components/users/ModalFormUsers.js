import {useContext, useEffect, useState} from 'react'
import usersContext from '../../states/contexts/users'
import {addUser, setModalStatus, setUserIdForUpdate, updateUser, setFilterValue} from '../../states/actions/users'
import {validation} from '../../modules/HelperFunctions'
import {FORM_ERRORS, SUCCESSFUL_OPERATION} from '../../constants/responses'
import InputElement from '../elements/InputElement'
import MultiColumnElement from '../elements/MultiColumnElement'
import SelectElement from '../elements/SelectElement'
import DateBirthElement from '../elements/DataBirthElement'
import ButtonElementLoading from '../loadings/ButtonElementLoading'
import localS from '../../modules/LocalStorage'
import swal from '../../modules/SwalAlert'

/**
 * This variable is an object of user information that is initialized for the first time.
 */
const initialData = {
    name: '',
    family: '',
    day: '',
    month: '',
    year: '',
    gender: '0', // 0: Male, 1: Female
    isAdmin: '0', //0: Normal, 1: Admin,
    email: '',
    password: '',
    password_confirmation: '',
    createdAt: Date.now()
}

/**
 * Rules required for form validation.
 */
const rules = {
    name: 'required',
    family: 'required',
    day: 'required|integer|min:1|max:31',
    month: 'required|integer|min:1|max:12',
    year: 'required|integer||min:1300|max:1401',
    email: 'required|email',
    password: 'required|confirmed|min:8',
}

/**
 * This component is for managing the user registration form or editing.
 */
const ModalFormUsers = ({backdrop = false, keyboard = false}) => {
    const [data, setData] = useState(initialData)

    const [errors, setErrors] = useState({})

    const [isSubmit, setIsSubmit] = useState(false)

    const {state: {users, userIdForUpdate, modalStatus, filterValue}, dispatch} = useContext(usersContext)

    /**
     * Specify the form for new editing or registration.
     */
    useEffect(() => {
        if (userIdForUpdate) {
            setData(users.filter(user => user.id === userIdForUpdate)[0])
        }
    }, [users, userIdForUpdate])

    /**
     * To close the modal, we define and delete the listener.
     */
    useEffect(() => {
        if (keyboard) {
            window.addEventListener('keydown', closeModalFormWithESC)
            return () => window.removeEventListener('keydown', closeModalFormWithESC)
        }
    })

    /**
     * If the ESC key is pressed, the modal closes.
     * @param e Contains event related to the window global object.
     */
    const closeModalFormWithESC = e => {
        if (e.keyCode === 27) dispatch(setModalStatus(false))
    }

    /**
     * This function is to receive data from inputs and register it in the object.
     * @param key Contains the key to assign value in it.
     * @param value Contains a value to record in a variable.
     */
    const inputHandler = (key, value) => setData({...data, [key]: value})

    /**
     * This function is to cancel the form and close it.
     */
    const cancelHandler = () => {
        setData(initialData)
        setErrors({})
        dispatch(setModalStatus(false))
        dispatch(setUserIdForUpdate(null))
        document.querySelector('body').classList.remove('overflow-hidden')
    }

    /**
     * This function is for recording or editing user information.
     * @param e This parameter contains the form element.
     */
    const submitHandler = async e => {
        try {
            e.preventDefault()
            await validation(data, rules)
            userIdForUpdate ? await updateHandler() : await insertHandler()
            cancelHandler()
            swal.toast('success', SUCCESSFUL_OPERATION)
        } catch (errors) {
            setErrors(errors)
            swal.toast('error', FORM_ERRORS)
        }
    }

    /**
     * This function performs the insertion operation.
     * @returns The output of a promise is without value.
     */
    const insertHandler = () => {
        return new Promise(async (resolve) => {
            setIsSubmit(true)
            const id = await localS.insert(data)
            setIsSubmit(false)
            filterValue === 'all'
                ? dispatch(addUser({...data, id})) 
                : dispatch(setFilterValue('all'))
            window.scrollTo({top: 0, behavior: 'smooth'})
            
            return resolve()
        })
    }

    /**
     * This function performs the update operation.
     * @returns The output of a promise is without value.
     */
    const updateHandler = () => {
        return new Promise(async (resolve) => {
            setIsSubmit(true)
            await localS.update(data)
            dispatch(updateUser(data))
            setIsSubmit(false)

            return resolve()
        })
    }

    return (
        <div className={`${modalStatus ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-auto`}>
            <div className="flex justify-center pt-4 px-4 pb-20 text-center sm:block">
                <div onClick={backdrop ? cancelHandler : null} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="relative inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full px-4 py-6">
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
                            <InputElement type="password" label="رمز عبور" keyname="password" error={errors.password} inputHandler={inputHandler} dir="ltr"/>
                            <InputElement type="password" label="تایید رمز عبور" keyname="password_confirmation" inputHandler={inputHandler} dir="ltr"/>
                        </MultiColumnElement>

                        <div className="text-left mt-8 flex items-center justify-end">
                            <ButtonElementLoading text={userIdForUpdate ? 'ویرایش' : 'ثبت'} isSubmit={isSubmit} size="md" className={`${isSubmit ? 'opacity-60' : 'opacity-1'} bg-green-700 hover:bg-green-800 focus:bg-green-800`} />
                            <button disabled={isSubmit ? 'disabled' : ''} onClick={cancelHandler} type="button" className={`${isSubmit ? 'opacity-60' : 'opacity-1'} rounded-md px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:w-auto focus:bg-red-800`}>انصراف</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalFormUsers