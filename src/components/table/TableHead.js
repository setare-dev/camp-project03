import {useContext} from 'react'
import usersContext from '../../states/contexts/users'
import {setIsSelectAll, setSelectedUsers} from './../../states/actions/users'

const TableHead = ({titles, bgColor = 'bg-gray-900', textColor = 'text-white'}) => {

    const {state: {isSelectAll}, dispatch} = useContext(usersContext)

    const selectAllHandler = () => {
        dispatch(setIsSelectAll(!isSelectAll))
        if (isSelectAll) dispatch(setSelectedUsers([]))
    }

    return (
        <thead className={`${bgColor} ${textColor} select-none`}>
            <tr>
                <th>
                    <div onClick={selectAllHandler} className={`${isSelectAll ? 'bg-indigo-700' : 'bg-gray-300 shadow-sm dark:bg-gray-400'} h-5 w-5 rounded-md cursor-pointer duration-500 mr-4`}>
                        {isSelectAll ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : null}
                    </div>
                </th>
                {titles.map((title, index) => <th key={index} className="p-4 truncate">{title}</th>)}
            </tr>
        </thead>
    )
}

export default TableHead