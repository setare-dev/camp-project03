import {createSlice} from '@reduxjs/toolkit'

const usersSlice = createSlice({
    name: 'users',
    initialState: {data: []},
    reducers: {
        setUsers: (state, {payload: users}) => {state.data = users},
        addUser: (state, {payload: user}) => {state.data.unshift(user)},
        deleteUser: (state, {payload: id}) => {state.data = state.data.filter(user => user.id !== id)},
        updateUser: (state, {payload: user}) => {state.data = state.data.map(item => item.id === user.id ? user: item)}
    }
})

export const {setUsers, addUser, deleteUser, updateUser} = usersSlice.actions

export default usersSlice.reducer