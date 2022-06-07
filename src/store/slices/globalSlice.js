import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isShowSidebar: true,
    isLoading: false,
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsShowSidebar: (state, {payload: status}) => {state.isShowSidebar = status},
        setIsLoading: (state, {payload: status}) => {state.isLoading = status},
    }
})

export const {setIsShowSidebar, setIsLoading} = globalSlice.actions

export default globalSlice.reducer