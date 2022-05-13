import {SET_USERS, ADD_USER, DELETE_USER, UPDATE_USER, SET_MODAL_STATUS, SET_USER_ID_FOR_UPDATE} from '../constants/user'

/**
 * The action is to register users in the state.
 * @param users List of users.
 * @returns Contains action object and user list.
 */
export const setUsers = users => ({
	type: SET_USERS,
    payload: {users}
})

/**
 * This action is to register a new user in the state.
 * @param user Contains an object of user information.
 * @returns Contains action object and user information.
 */
export const addUser = user => ({
	type: ADD_USER,
    payload: {user}
})

/**
 * This action is to delete the user.
 * @param id Contains the user id to delete the user.
 * @returns Contains action object and user id.
 */
export const deleteUser = id => ({
	type: DELETE_USER,
    payload: {id}
})

/**
 * This action is to update the user.
 * @param user Contains an object of user information.
 * @returns Contains action object and user information.
 */
export const updateUser = user => ({
	type: UPDATE_USER,
    payload: {user}
})

/**
 * This action is to change the status of the medal form.
 * @param status is true or false.
 * @returns Contains action object and status modal form.
 */
export const setModalStatus = status => ({
	type: SET_MODAL_STATUS,
    payload: {status}
})

/**
 * This action puts the user id for the edit form in the state.
 * @param id Contains the id to update the user.
 * @returns Contains action object and user id.
 */
export const setUserIdForUpdate = id => ({
	type: SET_USER_ID_FOR_UPDATE,
    payload: {id}
})
