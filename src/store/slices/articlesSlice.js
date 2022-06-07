import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    articlesArchive: [],
    articlesCurrentPage: [],
    modalStatus: false,
    idForUpdate: null,
    filterValue: 'all',
    selectedRows: [],
    isSelectAll: false,
    pagination: {totalCount: 0, pageSize: 10, currentPage: 1},
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticlesArchive: (state, {payload: {page, data: articles, totalDocs, limit}}) => {
            state.articlesArchive.filter(item => item.page === page).length ? state.articlesArchive = state.articlesArchive.map(item => item.page === state.pagination.currentPage ? {page, articles} : item) : state.articlesArchive.push({page, articles})
            state.articlesCurrentPage = articles
            state.pagination = {totalCount: totalDocs, pageSize: limit, currentPage: page}
            state.selectedRows = []
            state.isSelectAll = false
        },
        setArticlesCurrentPage: (state, {payload: page}) => {
            state.articlesCurrentPage = state.articlesArchive.filter(item => item.page === page)[0].articles
            state.pagination = {totalCount: state.pagination.totalCount, pageSize: state.pagination.pageSize, currentPage: page}
            state.selectedRows = []
            state.isSelectAll = false
        },
        deleteArticle: (state, {payload: id}) => {
            state.articlesCurrentPage = state.articlesCurrentPage.filter(article => article.id !== id)
            state.articlesArchive = state.articlesArchive.map(item => item.page === state.pagination.currentPage ? {...item, articles: item.articles.filter(article => article.id !== id)} : item)
        },
        updateArticle: (state, {payload: article}) => {
            state.articlesCurrentPage = state.articlesCurrentPage.map(item => item.id === article.id ? article : item)
            state.articlesArchive = state.articlesArchive.map(item => item.page === state.pagination.currentPage).map(item => item.id === article.id ? article : item)
        },
        setModalStatus: (state, {payload: status}) => {state.modalStatus = status},
        setIdForUpdate: (state, {payload: id}) => {state.idForUpdate = id},
        setFilterValue: (state, {payload: value}) => {state.filterValue = value},
        setSelectedRows: (state, {payload: id}) => {typeof id !== 'number' ? state.selectedRows = [] : state.selectedRows.includes(id) ? state.selectedRows = state.selectedRows.filter(item => item !== id) : state.selectedRows.push(id)},
        setIsSelectAll: (state, {payload: status}) => {state.isSelectAll = status},
        setPagination: (state, {payload: value}) => {state.pagination = value},
        resetArticlesState: (state) => {Object.assign(state, initialState)}
    }
})

export const {
    setArticlesArchive,
    setArticlesCurrentPage,
    deleteArticle,
    updateArticle,
    setModalStatus,
    setIdForUpdate,
    setFilterValue,
    setSelectedRows,
    setIsSelectAll,
    setPagination,
    resetArticlesState
} = articlesSlice.actions

export default articlesSlice.reducer