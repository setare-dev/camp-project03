import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    usersArchive: [],
    usersCurrentPage: [],
    modalStatus: false,
    idForUpdate: null,
    filterValue: 'all',
    selectedRows: [],
    isSelectAll: false,
    pagination: {totalCount: 0, pageSize: 10, currentPage: 1},
}

const usersSlice =createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersArchive: (state, {payload: {page, data: users, totalDocs, limit}}) => {
            state.usersArchive.filter(item => item.page === page).length ? state.usersArchive = state.usersArchive.map(item => item.page === state.pagination.currentPage ? {page, users} : item) : state.usersArchive.push({page, users})
            state.usersCurrentPage = users
            state.pagination = {totalCount: totalDocs, pageSize: limit, currentPage: page}
            state.selectedRows = []
            state.isSelectAll = false
        },
        setUsersCurrentPage: (state, {payload: page}) => {
            state.usersCurrentPage = state.usersArchive.filter(item => item.page === page)[0].users
            state.pagination = {totalCount: state.pagination.totalCount, pageSize: state.pagination.pageSize, currentPage: page}
            state.selectedRows = []
            state.isSelectAll = false
        },
        deleteUser: (state, {payload: id}) => {
            state.usersCurrentPage = state.usersCurrentPage.filter(user => user.id !== id)
            state.usersArchive = state.usersArchive.map(item => item.page === state.pagination.currentPage ? {...item, users: item.users.filter(user => user.id !== id)} : item)
        },
        updateUser: (state, {payload: user}) => {
            state.usersCurrentPage = state.usersCurrentPage.map(item => item.id === user.id ? user : item)
            state.usersArchive = state.usersArchive.map(item => item.page === state.pagination.currentPage).map(item => item.id === user.id ? user : item)
        },
        setModalStatus: (state, {payload: status}) => {state.modalStatus = status},
        setIdForUpdate: (state, {payload: id}) => {state.idForUpdate = id},
        setFilterValue: (state, {payload: value}) => {state.filterValue = value},
        setSelectedRows: (state, {payload: id}) => {typeof id !== 'number' ? state.selectedRows = [] : state.selectedRows.includes(id) ? state.selectedRows = state.selectedRows.filter(item => item !== id) : state.selectedRows.push(id)},
        setIsSelectAll: (state, {payload: status}) => {state.isSelectAll = status},
        setPagination: (state, {payload: value}) => {state.pagination = value},
        resetUsersState: (state) => {Object.assign(state, initialState)}
    }
})

export const {
    setUsersArchive,
    setUsersCurrentPage,
    deleteUser,
    updateUser,
    setModalStatus,
    setIdForUpdate,
    setFilterValue,
    setSelectedRows,
    setIsSelectAll,
    setPagination,
    resetUsersState
} = usersSlice.actions

export default usersSlice.reducer