import {useSelector} from 'react-redux'
import DataSetItem from './dataSetItemTodos'
import {EMPTY_DATA} from '../../constants/responsesConstant'

const DataSetTodos = () => {

    const {todosCurrentPage: todos} = useSelector(state => state.todos)

    return (
        <div className="my-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todos.map(todo => <DataSetItem key={todo.id} {...todo} />)}
            </div>
            {!todos.length ? <div className="bg-indigo-100 dark:bg-gray-600 rounded-lg p-4 text-gray-500 dark:text-gray-100 text-md">{EMPTY_DATA}</div> : null}
        </div>
    )
}

export default DataSetTodos