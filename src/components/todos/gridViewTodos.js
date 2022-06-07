import {useSelector} from 'react-redux'
import {setIsSelectAll, setSelectedRows} from '../../store/slices/todosSlice'
import GridViewItemTodos from './gridViewItemTodos'
import TableElement from '../global/elements/tableElement'
import TableHead from '../global/table/tableHead'
import TableFooter from '../global/table/tableFooter'

const GridViewTodos = () => {

    const {todosCurrentPage: todos} = useSelector(state => state.todos)

    return (
        <TableElement>
            <TableHead slice="todos" setIsSelectAll={setIsSelectAll} setSelectedRows={setSelectedRows} titles={['متن', 'عملیات']}/>
            <tbody>{todos.map(todo => <GridViewItemTodos key={todo.id} {...todo} />)}</tbody>
            <TableFooter dataLength={todos.length} colSpan="3"/>
        </TableElement>
    )
}

export default GridViewTodos