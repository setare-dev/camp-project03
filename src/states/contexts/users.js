import {createContext} from 'react'

/**
 * This context contains an object in which the list of users and the status of the medal and the user ID are to be edited.
 */
export default createContext({
    users: [
        {
            id: Number,
            name: String,
            family: String,
            day: Number,
            month: Number,
            year: Number,
            gender: Boolean,
            isAdmin: Boolean,
            email: String,
            password: String,
            createdAt: String,
        }
    ],
    modalStatus: Boolean,
    userIdForUpdate: Number | null,
    filterValue: String,
    isLoading: Boolean,
    selectedUsers: [Number],
    isSelectAll: Boolean
})