import {
    SET_USERS,
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    SET_MODAL_STATUS,
    SET_USER_ID_FOR_UPDATE,
    SET_FILTER_VALUE,
    SET_IS_LOADING
} from '../constants/user'

/**
 * This reducer is for operation on the state user, whose actions can be seen below.
 */
const UsersReducer = (prevState, action) => {
    switch (action.type) {
        case SET_USERS: return setUsers(prevState, action)
        case ADD_USER: return addUser(prevState, action)
        case DELETE_USER: return deleteUser(prevState, action)
        case UPDATE_USER: return updateUser(prevState, action)
        case SET_MODAL_STATUS: return setModalStatus(prevState, action)
        case SET_USER_ID_FOR_UPDATE: return setUserIdForUpdate(prevState, action)
        case SET_FILTER_VALUE: return setFilterValue(prevState, action)
        case SET_IS_LOADING: return setIsLoading(prevState, action)
        default: return prevState
    }
}

/**
 * This method initializes our state.
 * @param action Contains payload which is the same as users information array.
 * @returns A new state in which a new user is added.
 */
 const setUsers = (prevState, action) => ({...prevState, users: action.payload.users})

/**
 * The task of this method is to add a new user.
 * @param prevState Contains previous status.
 * @param action Contains payload which is the same as user information.
 * @returns A new state in which a new user is added.
 */
const addUser = (prevState, action) => {
    let {user} = action.payload
    return {...prevState, users: [user, ...prevState.users]}
}

/**
 * The task of this method is to delete the user.
 * @param prevState Contains previous status.
 * @param action Contains payload which is the same as user id.
 * @returns After deleting the user, the new state is returned.
 */
const deleteUser = (prevState, action) => {
    let {id} = action.payload
    return {...prevState, users: [...prevState.users.filter(user => user.id !== id)]}
}

/**
 * This method is responsible for editing user information.
 * @param prevState Contains previous status.
 * @param action Contains payload which is the same as user id and user information.
 * @returns Return the new state after editing the desired user.
 */
const updateUser = (prevState, action) => {
    let {id} = action.payload.user
    let index = prevState.users.findIndex(user => user.id === id)
    prevState.users[index] = action.payload.user
    return {...prevState, users: prevState.users}
}

/**
 * 
 * @param prevState Contains previous status.
 * @param action Contains payload which is the same as status for modal form.
 * @returns Return the new state after editing the status modal.
 */
const setModalStatus = (prevState, action) => ({...prevState, modalStatus: action.payload.status})

/**
 * 
 * @param prevState Contains previous status.
 * @param action Contains payload which is the same as user id for update.
 * @returns Return the new state after editing the user.
 */
const setUserIdForUpdate = (prevState, action) => ({...prevState, userIdForUpdate: action.payload.id})

/**
 * This method stores the search value in the state.
 * @param prevState Contains previous status.
 * @param action Contains a load that is the same as the search filter.
 * @returns The output of the state is new.
 */
const setFilterValue = (prevState, action) => ({...prevState, filterValue: action.payload.value})

/**
 * This method changes the amount of isLoading.
 * @param prevState Contains previous status.
 * @param action contains a load which is the same as isLoading.
 * @returns The output of the state is new.
 */
const setIsLoading = (prevState, action) => ({...prevState, isLoading: action.payload.status})

export default UsersReducer