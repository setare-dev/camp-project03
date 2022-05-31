import {object, string} from 'yup'
import {transfer} from '.'

export const initialData = {
    title: '',
    description: '',
    body: '',
    slug: '',
    status: 'draft', // draft - public
    createdAt: ''
}

export const articleSchema = () => { 
    return object({
        title:
            string()
            .required(transfer('required', 'title'))
        ,description:
            string()
            .required(transfer('required', 'description'))
            .min(20, transfer('min', 'description', 20))
            .max(150, transfer('max', 'description', 150))
        ,body:
            string()
            .required(transfer('required', 'body'))
        ,status:
            string()
            .required(transfer('required', 'status'))
    })
}