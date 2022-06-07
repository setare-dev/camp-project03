import {configureStore} from '@reduxjs/toolkit'
import globalReducer from './slices/globalSlice'
import usersReducer from './slices/usersSlice'
import articlesReducer from './slices/articlesSlice'
import todosReducer from './slices/todosSlice'

export const store = configureStore({
    reducer: {
        global: globalReducer,
        users: usersReducer,
        articles: articlesReducer,
        todos: todosReducer
    }
})