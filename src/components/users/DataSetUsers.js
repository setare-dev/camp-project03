import {useContext} from 'react'
import usersContext from '../../states/contexts/users'
import DataSetItem from './DataSetItemUsers'
import {EMPTY_DATA} from '../../constants/responses'

/**
 * The task of this component is to create a data set from the list of users.
 */
const DataSetUsers = () => {
    const {state} = useContext(usersContext)

    return (
        <div className="my-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.users.map(user => <DataSetItem key={user.id} {...user} />)}
            </div>
            {!state.users.length ? <div className="bg-indigo-100 dark:bg-gray-600 rounded-lg p-4 text-gray-500 dark:text-gray-100 text-md">{EMPTY_DATA}</div> : null}
        </div>
    )
}

export default DataSetUsers