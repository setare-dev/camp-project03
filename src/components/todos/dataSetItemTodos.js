import useDeleteAndUpdateTodos from '../../hooks/useDeleteAndUpdateTodos'
import DataSetRowElement from '../global/elements/dataSetRowElement'
import SelectItemTodos from './selectItemTodos'
import ButtonElementLoading from '../global/loadings/buttonElementLoading'

const DataSetItemTodos = ({id, text, done}) => {

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler, toggleDoneHandler} = useDeleteAndUpdateTodos(id)

    return (
        <div className={`${isSelect ? 'bg-indigo-100 dark:bg-slate-400/50' : 'bg-gray-200 dark:bg-gray-900'} p-3 rounded-lg space-y-3 relative`}>
            
            <SelectItemTodos type="dataset" todoId={id} isSelect={isSelect} setIsSelect={setIsSelect} />

            <DataSetRowElement>
                {done ? <span className="line-through opacity-50 py-5 h-20">{text}</span> : <span className="py-5 h-20">{text}</span>}
            </DataSetRowElement>

            <div className="grid grid-cols-3">
                <ButtonElementLoading size="md" onClick={toggleDoneHandler} text={done ? 'ناتمام' : 'تمام'} isSubmit={getIsSubmit('toggle')} className={`${done ? 'bg-amber-600 hover:bg-amber-700 focus:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700'} duration-300`} />
                <ButtonElementLoading onClick={updateHandler} text="ویرایش" isSubmit={getIsSubmit()} size="sm" className={`${getIsSubmit() !== '' ? 'opacity-60' : 'opacity-1'} bg-green-700 text-white p-1 ml-2 text-sm rounded-md show hover:bg-green-800 focus:bg-green-800 duration-300`} />
                <ButtonElementLoading size="md" onClick={deleteHandler} text="حذف" isSubmit={getIsSubmit('delete')} className="bg-red-600 hover:bg-red-700 focus:bg-red-700 duration-300" />
            </div>
        </div>
    )
}

export default DataSetItemTodos