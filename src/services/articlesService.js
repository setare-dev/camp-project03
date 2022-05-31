import axios from '.'

export const createArticleService = async data => await axios.post('/articles', data)

export const updateArticleService = async data => await axios.put(`/articles/${data.id}`, data)

export const deleteArticleService = async userId => await axios.delete(`/articles/${userId}`)

export const getArticlesService = async (page = 1, filter = null, sort = 'createdAt:-1') => await axios.get(`/articles?page=${page}${filter ? `&filter=${filter}` : ''}&sort=${sort}`)

export const searchArticleService = async (key, value) => await axios.get(`/articles?search=${key}:${value}`)