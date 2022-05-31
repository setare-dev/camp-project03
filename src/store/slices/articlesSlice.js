import {createSlice} from '@reduxjs/toolkit'

const articlesSlice = createSlice({
    name: 'articles',
    initialState: {data: []},
    reducers: {
        setArticles: (state, {payload: articles}) => {state.data = articles},
        addArticle: (state, {payload: article}) => {state.data.unshift(article)},
        deleteArticle: (state, {payload: id}) => {state.data = state.data.filter(article => article.id !== id)},
        updateArticle: (state, {payload: article}) => {state.data = state.data.map(item => item.id === article.id ? article: item)}
    }
})

export const {setArticles, addArticle, deleteArticle, updateArticle} = articlesSlice.actions

export default articlesSlice.reducer