import {useContext, useEffect} from 'react'
import usersContext from '../../states/contexts/users'
import {setIsSelectAll, setSelectedUsers} from '../../states/actions/users'

const DataSetItemSelectUsers = ({userId, isSelect, setIsSelect}) => {

    const {state: {isSelectAll, selectedUsers}, dispatch} = useContext(usersContext)

    /**
     * isSelectAll is managed here.
     */
    useEffect(() => {
        if (isSelectAll) {
            setIsSelect(true)
            if (!selectedUsers.includes(userId)) dispatch(setSelectedUsers(userId))
        } else if (!selectedUsers.includes(userId)) {
            setIsSelect(false)
        }   
    }, [isSelectAll, dispatch, userId, setIsSelect])

     /**
     * This method is for selecting or not selecting any item.
     */
    const selectHandler = () => {
        setIsSelect(!isSelect)
        if (isSelect) dispatch(setIsSelectAll(false))
        dispatch(setSelectedUsers(userId))
    }

    return (
        <div onClick={selectHandler} className={`${isSelect ? 'bg-indigo-700' : 'bg-gray-300 shadow-sm dark:bg-gray-400'} h-5 w-5 rounded-md cursor-pointer duration-500 absolute top-2 left-2`}>
            {isSelect ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : null}
        </div>
    )
}

export default DataSetItemSelectUsers