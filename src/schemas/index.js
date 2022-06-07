export const messages = {
    required: 'فیلد :attr الزامی است',
    integer: 'فیلد :attr باید عددی باشد',
    min: 'فیلد :attr نباید کمتر از :min حرف باشد',
    max: 'فیلد :attr نباید بیشتر از :max حرف باشد',
    email: 'فرمت ایمیل نامعتبر است',
    confirmed: 'رمز عبور باید با تایید رمز عبور مطابقت داشته باشد',
    duplicate: 'فیلد :attr تکراری است'
}

export const fields = {
    name: 'نام',
    family: 'فامیل',
    email: 'ایمیل',
    password: 'رمز عبور',
    password_confirmation: 'تایید رمز عبور',
    year: 'سال',
    month: 'ماه',
    day: 'روز',
    isAdmin: 'نوع کاربری',
    gender: 'جنسیت',
    username: 'نام کاربری',
    fullname: 'نام و فامیل',
    title: 'عنوان',
    body: 'متن',
    status: 'وضعیت',
    description: 'توضیحات',
    text: 'متن'
}

export const transfer = (rule, field, value = null) => messages[rule].replace(':attr', fields[field]).replace(`:${rule}`, value)