import {createSlice} from '@reduxjs/toolkit'
import queryString from 'query-string'

const initialState = {
    isShowSidebar: true,
    modalStatus: false,
    idForUpdate: null,
    isLoading: false,
    selectedRows: [],
    isSelectAll: false,
    filterValue: queryString.parse(window.location.search).filter || 'all',
    pagination: {totalCount: 0, pageSize: 10, currentPage: 1},
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsShowSidebar: (state, {payload: status}) => {state.isShowSidebar = status},
        setModalStatus: (state, {payload: status}) => {state.modalStatus = status},
        setIdForUpdate: (state, {payload: id}) => {state.idForUpdate = id},
        setFilterValue: (state, {payload: value}) => {state.filterValue = value},
        setIsLoading: (state, {payload: status}) => {state.isLoading = status},
        setSelectedRows: (state, {payload: id}) => {typeof id !== 'number' ? state.selectedRows = [] : state.selectedRows.includes(id) ? state.selectedRows.filter(item => item !== id) : state.selectedRows.push(id)},
        setIsSelectAll: (state, {payload: status}) => {state.isSelectAll = status},
        setPagination: (state, {payload: value}) => {state.pagination = value},
        resetGlobalState: (state, {payload: properties = {}}) => {state.isShowSidebar = 'isShowSidebar' in properties ? properties.isShowSidebar : state.isShowSidebar; state.modalStatus = false; state.idForUpdate = null; state.isLoading = false; state.selectedRows = []; state.isSelectAll = false; state.filterValue = properties?.filterValue || 'all'; state.pagination = {totalCount: 0, pageSize: 10, currentPage: 1};}
    }
})

export const {setIsShowSidebar, setModalStatus, setIdForUpdate, setFilterValue, setIsLoading, setSelectedRows, setIsSelectAll, setPagination, resetGlobalState} = globalSlice.actions

export default globalSlice.reducer