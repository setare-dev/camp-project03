import {object, string, number, boolean, ref} from 'yup'
import {getCurrentPersianYear} from '../modules/helperFunctions'
import {messages, transfer} from '.'
import {searchUserService} from '../services/usersService'

const {integer, email, confirmed} = messages
const currentYear = Number(getCurrentPersianYear('en'))

export const initialData = {
    name: '',
    family: '',
    day: '',
    month: '',
    year: '',
    gender: 0, // 0: Male, 1: Female
    isAdmin: 0, //0: Normal, 1: Admin,
    email: '',
    password: '',
    passwordConfirmation: '',
    createdAt: ''
}

export const userSchema = (type = 'create') => { 
    return object({
        name: 
            string()
            .required(transfer('required', 'name'))
        ,family:
            string()
            .required(transfer('required', 'family'))
        ,day: 
            number()
            .typeError(transfer('integer', 'name'))
            .required(transfer('required', 'day'))
            .min(1, transfer('min', 'day', 1))
            .max(31, transfer('max', 'day', 31))
        ,month: 
            number(integer)
            .required(transfer('required', 'month'))
            .min(1, transfer('min', 'month', 1))
            .max(12, transfer('max', 'month', 12))
        ,year: 
            number(integer)
            .required(transfer('required', 'year'))
            .min(1330, transfer('min', 'year', 1330))
            .max(currentYear, transfer('max', 'year', currentYear))
        ,gender: 
            boolean()
            .required(transfer('required', 'gender'))
        ,isAdmin:
            boolean()
            .required(transfer('required', 'isAdmin'))
        ,email:
            string()
            .required(transfer('required', 'email'))
            .email(email)
            .test({
                message: () => transfer('duplicate', 'email'),
                test: async (email, {parent: {id}}) => {
                    if (type === 'create') {
                        const {data: {data}} = await searchUserService('email', email)
                        return data.length ? false : true
                    } else {
                        const {data: {data}} = await searchUserService('email', email)
                        return data.length && data[0].id !== id ? false : true
                    }                
                }
            })
        ,password:
            type === 'create'
                ?
                    string()
                    .required(transfer('required', 'password'))
                    .min(8, transfer('min', 'password', 8))
                    .max(32, transfer('max', 'password', 32))
                :
                    string()
                    .nullable(true)
                    .transform((o, c) => o === "" ? null : c)
                    .min(8, transfer('min', 'password', 8))
                    .max(32, transfer('max', 'password', 32))
        ,passwordConfirmation:
            type === 'create'
                ?
                    string()
                    .oneOf([ref('password'), null], confirmed)
                :
                    string()
                    .test('passwordConfirmation', confirmed, function (value) {
                        return this.parent.password != null ? this.parent.password === value : true
                    })
    })
}