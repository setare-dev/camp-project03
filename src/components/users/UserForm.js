import {useContext, useEffect, useState} from 'react'
import UsersContext from '../../contexts/users'
import {addUser, updateUser, setModalStatus, setUserIdForUpdate} from '../../actions/users'
import {validation} from '../../modules/HelperFunctions'
import {FORM_ERRORS, SUCCESSFUL_OPERATION} from './../../constants/responses'
import InputElement from './../elements/Input'
import MultiColumnElement from './../elements/MultiColumn'
import SelectElement from './../elements/Select'
import DateBirthElement from './../elements/DateBirth'
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
    email: '',
    isAdmin: '0', //0: Normal, 1: Admin,
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
}

/**
 * Text errors that are required in validation.
 */
const messages = {
    required: 'فیلد الزامی است',
    integer: 'فیلد باید عددی باشد',
    min: 'فیلد نباید کمتر از 5 باشد',
    email: 'فرمت نامعتبر است'
}

/**
 * This component is for managing the user registration form or editing
 */
export default (props) => {
    const [data, setData] = useState(initialData)

    const [errors, setErrors] = useState({})

    const {state, dispatch} = useContext(UsersContext)

    /**
     * Specify the form for new editing or registration.
     */
    useEffect(() => {
        if (state.userIdForUpdate) {
            setData(state.users.filter(user => user.id == state.userIdForUpdate)[0])
        }
    }, [state.userIdForUpdate])

    /**
     * This function is to receive data from inputs and register it in the object.
     * @param key Contains the key to assign value in it
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
    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            await validation(data, rules, messages)

            if (state.userIdForUpdate) {
                localS.update(data)
                dispatch(updateUser(data))
            } else {
                const id = localS.insert(data)
                dispatch(addUser({...data, id}))
            }
            
            e.target.reset()
            cancelHandler()
            window.scrollTo({top: 0, behavior: 'smooth'})
            swal.toast('success', SUCCESSFUL_OPERATION)
        } catch (errors) {
            setErrors(errors)
            swal.toast('error', FORM_ERRORS)
        }
    }

    return (
        <div className={`${state.modalStatus ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-auto`}>
            <div className="flex justify-center pt-4 px-4 pb-20 text-center sm:block">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="relative inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full px-4 py-6">
                    <h4 className="flex items-center text-2xl mb-8 font-semibold text-gray-500 dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        <span>{state.userIdForUpdate ? 'ویرایش کاربر' : 'ثبت کاربر'}</span>
                    </h4>

                    <form onSubmit={submitHandler}>
                        <MultiColumnElement>
                            <InputElement label="نام" keyname="name" value={data.name} error={errors.name} inputHandler={inputHandler} />
                            <InputElement label="فامیل" keyname="family" value={data.family} error={errors.family} inputHandler={inputHandler} />
                        </MultiColumnElement>

                        <MultiColumnElement>
                            <DateBirthElement label="متولد" day={data.day} month={data.month} year={data.year} errors={errors} inputHandler={inputHandler} />
                            <SelectElement label="جنسیت" keyname="gender" value={data.gender} options={[{value: 0, text: 'مرد'}, {value: 1, text: 'زن'}]} error={errors.gender} inputHandler={inputHandler} />
                        </MultiColumnElement>

                        <MultiColumnElement>
                            <InputElement label="ایمیل" keyname="email" value={data.email} error={errors.email} inputHandler={inputHandler} dir="ltr" />
                            <SelectElement label="نوع کاربری" keyname="isAdmin" value={data.isAdmin} options={[{value: 0, text: 'معمولی'}, {value: 1, text: 'مدیر'}]} error={errors.isAdmin} inputHandler={inputHandler} />
                        </MultiColumnElement>

                        <div className="text-left mt-8">
                            <button type="submit" className="lose justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-700 text-base font-medium text-white hover:bg-green-800 focus:outline-none ml-3 sm:w-auto sm:text-sm focus:bg-green-800">{state.userIdForUpdate ? 'ویرایش' : 'ثبت'}</button>
                            <button onClick={cancelHandler} type="button" className="lose justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:w-auto sm:text-sm focus:bg-red-800">انصراف</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}