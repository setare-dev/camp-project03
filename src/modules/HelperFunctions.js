export const random = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const convertDateToPersianDate = (date) => new Date(date).toLocaleDateString('fa-IR', {day: "numeric", month: "long", year: "numeric"})

const convertLocaleDigits = (value, input = 'fa', output = 'en') => {
    const locales = {fa: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'], en: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
    return (value.split('').map(item => locales[output][locales[input].findIndex(i => i === item)])).join('')
}

export const timestampToPersianDate = (timestamp) => convertDateToPersianDate(timestamp)

export const getCurrentPersianYear = (digit = 'fa') => digit === 'fa' ? convertDateToPersianDate(Date.now()).split(' ')[2] : convertLocaleDigits(convertDateToPersianDate(Date.now()).split(' ')[2])

export const createSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, '')
    str = str.toLowerCase()
    str = str.replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '').replace(/\s+/g, '-').replace(/-+/g, '-')
    return str
}