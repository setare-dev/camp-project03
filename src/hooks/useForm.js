import {useState} from 'react'

const UseForm = (initialData) => {
    
    const [data, setData] = useState(initialData)

    const [errors, setErrors] = useState({})

    const [isSubmit, setIsSubmit] = useState(false)

    const inputHandler = (key, value, type = 'string') => setData({...data, [key]: type === 'number' ? Number(value) : value})

    const mapYupErrors = (errors) => {
        let errorsObj = {}
        errors = errors.inner.map(err => ({[err.path]: err.message}))
        errors.reverse().forEach(err => errorsObj = {...errorsObj, ...err})
    
        return errorsObj
    }

    return {data, setData, errors, setErrors, mapYupErrors, isSubmit, setIsSubmit, inputHandler}
}

export default UseForm