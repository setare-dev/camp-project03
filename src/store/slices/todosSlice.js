import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    todosArchive: [],
    todosCurrentPage: [],
    modalStatus: false,
    idForUpdate: null,
    filterValue: 'all',
    selectedRows: [],
    isSelectAll: false,
    pagination: {totalCount: 0, pageSize: 10, currentPage: 1},
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodosArchive: (state, {payload: {page, data: todos, totalDocs, limit}}) => {
            state.todosArchive.filter(item => item.page === page).length ? state.todosArchive = state.todosArchive.map(item => item.page === state.pagination.currentPage ? {page, todos} : item) : state.todosArchive.push({page, todos})
            state.todosCurrentPage = todos
            state.pagination = {totalCount: totalDocs, pageSize: limit, currentPage: page}
            state.selectedRows = []
            state.isSelectAll = false
        },
        setTodosCurrentPage: (state, {payload: page}) => {
            state.todosCurrentPage = state.todosArchive.filter(item => item.page === page)[0].todos
            state.pagination = {totalCount: state.pagination.totalCount, pageSize: state.pagination.pageSize, currentPage: page}
            state.selectedRows = []
            state.isSelectAll = false
        },
        deleteTodo: (state, {payload: id}) => {
            state.todosCurrentPage = state.todosCurrentPage.filter(todo => todo.id !== id)
            state.todosArchive = state.todosArchive.map(item => item.page === state.pagination.currentPage ? {...item, todos: item.todos.filter(todo => todo.id !== id)} : item)
        },
        updateTodo: (state, {payload: todo}) => {
            state.todosCurrentPage = state.todosCurrentPage.map(item => item.id === todo.id ? todo : item)
            state.todosArchive = state.todosArchive.map(item => item.page === state.pagination.currentPage).map(item => item.id === todo.id ? todo : item)
        },
        toggleDoneTodo: (state, {payload: id}) => {
            state.todosCurrentPage = state.todosCurrentPage.map(item => item.id === id ? {...item, done: !item.done} : item)
            state.todosArchive = state.todosArchive.map(item => item.page === state.pagination.currentPage).map(item => item.id === id ? {...item, done: !item.done} : item)
        },
        setModalStatus: (state, {payload: status}) => {state.modalStatus = status},
        setIdForUpdate: (state, {payload: id}) => {state.idForUpdate = id},
        setFilterValue: (state, {payload: value}) => {state.filterValue = value},
        setSelectedRows: (state, {payload: id}) => {typeof id !== 'number' ? state.selectedRows = [] : state.selectedRows.includes(id) ? state.selectedRows = state.selectedRows.filter(item => item !== id) : state.selectedRows.push(id)},
        setIsSelectAll: (state, {payload: status}) => {state.isSelectAll = status},
        setPagination: (state, {payload: value}) => {state.pagination = value},
        resetTodosState: (state) => {Object.assign(state, initialState)}
    }
})

export const {
    setTodosArchive,
    setTodosCurrentPage,
    deleteTodo,
    updateTodo,
    toggleDoneTodo,
    setModalStatus,
    setIdForUpdate,
    setFilterValue,
    setSelectedRows,
    setIsSelectAll,
    setPagination,
    resetTodosState
} = todosSlice.actions

export default todosSlice.reducer