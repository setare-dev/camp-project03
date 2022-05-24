import moment from 'jalali-moment'

/**
 * 
 * @param errors
 * @returns 
 */
export const mapYupErrors = (errors) => {
    let errorsObj = {}
    errors = errors.inner.map(err => ({[err.path]: err.message}))
    errors.reverse().forEach(err => errorsObj = {...errorsObj, ...err})

    return errorsObj
}

/**
 * This helper function produces a random number between two numbers.
 * @param min This parameter contains the minimum number.
 * @param max This parameter contains the maximum number.
 * @returns The output is an integer.
 */
 export const random = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * This helper returns the time stamp function to the solar date.
 * @param timestamp This is the time stamp parameter.
 * @returns The output is a solar date.
 */
export const timestampToPersianDate = (timestamp) => moment(new Date(timestamp), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')

export const getCurrentPersianYear = () => moment(new Date(Date.now()), 'YYYY').locale('fa').format('YYYY')