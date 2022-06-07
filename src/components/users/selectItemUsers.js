import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setIsSelectAll, setSelectedRows} from '../../store/slices/usersSlice'

const DataSetItemSelectUsers = ({type = 'gridview', userId, isSelect, setIsSelect}) => {

    const {isSelectAll, selectedRows} = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isSelectAll) {
            setIsSelect(true)
            if (!selectedRows.includes(userId)) dispatch(setSelectedRows(userId))
        } else if (!selectedRows.includes(userId)) {
            setIsSelect(false)
        }   
    }, [isSelectAll, dispatch, userId, setIsSelect, selectedRows])

    const selectHandler = () => {
        setIsSelect(!isSelect)
        if (isSelect) dispatch(setIsSelectAll(false))
        dispatch(setSelectedRows(userId))
    }

    return (
        <div onClick={selectHandler} className={`${isSelect ? 'bg-indigo-700' : 'bg-gray-400/50  dark:bg-gray-400 shadow-sm'} ${type === 'dataset' ? 'absolute top-2 left-2' : ''} h-5 w-5 rounded-md cursor-pointer duration-500`}>
            {isSelect ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : null}
        </div>
    )
}

export default DataSetItemSelectUsers