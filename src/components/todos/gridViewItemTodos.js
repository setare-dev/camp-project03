import useDeleteAndUpdateTodos from '../../hooks/useDeleteAndUpdateTodos'
import TableRowElement from '../global/elements/tableRowElement'
import TableDataElement from '../global/elements/tableDataElement'
import ButtonElementLoading from '../global/loadings/buttonElementLoading'
import SelectItemTodos from './selectItemTodos'

const GridViewItemTodos = ({id, text, done}) => {

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, toggleDoneHandler, updateHandler} = useDeleteAndUpdateTodos(id)

    return (
        <TableRowElement isSelect={isSelect}>
            <TableDataElement>
                <SelectItemTodos type="gridview" todoId={id} isSelect={isSelect} setIsSelect={setIsSelect} />
            </TableDataElement>
            <TableDataElement>
                {done ? <span className="line-through opacity-50">{text}</span> : <span>{text}</span>}
            </TableDataElement>
            <TableDataElement>
                <ButtonElementLoading onClick={toggleDoneHandler} text={done ? 'ناتمام' : 'تمــام'} isSubmit={getIsSubmit('toggle')} size="sm" className={`${done ? 'bg-amber-600 hover:bg-amber-700 focus:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700'} duration-300`} />
                <ButtonElementLoading onClick={updateHandler} text="ویرایش" isSubmit={getIsSubmit()} size="sm" className={`${getIsSubmit() !== '' ? 'opacity-60' : 'opacity-1'} bg-green-700 text-white p-1 ml-2 text-sm rounded-md show hover:bg-green-800 focus:bg-green-800 duration-300`} />
                <ButtonElementLoading onClick={deleteHandler} text="حذف" isSubmit={getIsSubmit('delete')} size="sm" className="bg-red-600 hover:bg-red-700 focus:bg-red-700 duration-300" />
            </TableDataElement>
        </TableRowElement>
    )
}

export default GridViewItemTodos