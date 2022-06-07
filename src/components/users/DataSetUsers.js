import {useSelector} from 'react-redux'
import DataSetItem from './dataSetItemUsers'
import {EMPTY_DATA} from '../../constants/responsesConstant'

const DataSetUsers = () => {

    const {usersCurrentPage: users} = useSelector(state => state.users)

    return (
        <div className="my-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => <DataSetItem key={user.id} {...user} />)}
            </div>
            {!users.length ? <div className="bg-indigo-100 dark:bg-gray-600 rounded-lg p-4 text-gray-500 dark:text-gray-100 text-md">{EMPTY_DATA}</div> : null}
        </div>
    )
}

export default DataSetUsers