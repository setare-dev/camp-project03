import Validator from 'Validator'
import moment from 'jalali-moment'

/**
 * This is a helper function for validating forms.
 * @param data Contains information that we need to confirm.
 * @param rules The rules by which we validate the data.
 * @param messages Contains error messages for validation.
 * @returns This helper function returns a promise that either returns an error or is true.
 */
export const  validation = (data, rules, messages) => {
    return new Promise((resolve, reject) => {
        const v = Validator.make(data, rules, messages)
        if (v.fails()) {
            const errors = v.getErrors();
            Object.entries(errors).forEach(([key, value]) => errors[key] = value[0])

            return reject(errors)
        }

        return resolve(true)
    })
}

/**
 * This helper returns the time stamp function to the solar date.
 * @param timestamp This is the time stamp parameter.
 * @returns The output is a solar date.
 */
export const timestampToPersianDate = (timestamp) => {
    return moment(new Date(timestamp), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
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