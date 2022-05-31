import axios from '.'

export const createUserService = async data => await axios.post('/users', filterPassConf(data))

export const updateUserService = async data => await axios.put(`/users/${data.id}`, filterPass(filterPassConf(data)))

export const deleteUserService = async userId => await axios.delete(`/users/${userId}`)

export const getUsersService = async (page = 1, filter = null, sort = 'createdAt:-1') => await axios.get(`/users?page=${page}${filter ? `&filter=${filter}` : ''}&sort=${sort}`)

export const searchUserService = async (key, value) => await axios.get(`/users?search=${key}:${value}`)

const filterPassConf = (data) => Object.fromEntries(Object.entries(data).filter(([key]) => !key.includes('passwordConfirmation')))

const filterPass = (data) => Object.fromEntries(Object.entries(data).filter(([key]) => !key.includes('password') && (!data.password.length)))