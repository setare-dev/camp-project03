import {useSelector, useDispatch} from 'react-redux'
import {setIsSelectAll, setSelectedRows} from '../store/slices/globalSlice'

const UseTableHead = () => {

    const {isSelectAll} = useSelector(state => state.global)

    const dispatch = useDispatch()

    const selectAllHandler = () => {
        dispatch(setIsSelectAll(!isSelectAll))
        if (isSelectAll) dispatch(setSelectedRows([]))
    }

    return {isSelectAll, selectAllHandler}
}

export default UseTableHead