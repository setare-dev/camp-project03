import axios from '.'

const route = '/todos'

export const createTodoService = async data => await axios.post(route, data)

export const updateTodoService = async data => await axios.put(`${route}/${data.id}`, data)

export const deleteTodoService = async todoId => await axios.delete(`${route}/${todoId}`)

export const getTodosService = async (page = 1, filter = null, sort = 'createdAt:-1') => await axios.get(`${route}?page=${page}${filter ? `&filter=${filter}` : ''}&sort=${sort}`)