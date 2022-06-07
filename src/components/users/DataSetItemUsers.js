import useDeleteAndUpdateUsers from '../../hooks/useDeleteAndUpdateUsers'
import {timestampToPersianDate} from '../../modules/helperFunctions'
import DataSetRowElement from '../global/elements/dataSetRowElement'
import SelectItemUsers from './selectItemUsers'
import ButtonElementLoading from '../global/loadings/buttonElementLoading' 

const DataSetItemUsers = ({id, name, family, day, month, year, gender, email, isAdmin, createdAt}) => {

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler} = useDeleteAndUpdateUsers(id)

    return (
        <div className={`${isSelect ? 'bg-indigo-100 dark:bg-slate-400/50' : 'bg-gray-200 dark:bg-gray-900'} p-3 rounded-lg space-y-3 relative`}>
            
            <SelectItemUsers type="dataset" userId={id} isSelect={isSelect} setIsSelect={setIsSelect} />

            <DataSetRowElement className="text-lg font-semibold">
                <div className="ml-1">{!gender ? 'آقای' : 'خانم'}</div>
                <div className="ml-1">{name}</div>
                <div>{family}</div>
            </DataSetRowElement>

            <DataSetRowElement>
                <div className="ml-1 opacity-60">متولد</div>
                <div>{year}/{month}/{day}</div>
            </DataSetRowElement>

            <DataSetRowElement>
                <div className="ml-1 opacity-60">نوع کاربری</div>
                <div>{isAdmin ? 'مدیر' : 'معمولی'}</div>
            </DataSetRowElement>

            <DataSetRowElement>
                <div className="ml-1 opacity-60">تاریخ عضویت</div>
                <div>{timestampToPersianDate(createdAt)}</div>
            </DataSetRowElement>

            <DataSetRowElement className="text-left">
                {email}
            </DataSetRowElement>

            <div className="grid grid-cols-2">
                <ButtonElementLoading onClick={updateHandler} text="ویرایش" isSubmit={getIsSubmit()} size="sm" className={`${getIsSubmit() !== '' ? 'opacity-60' : 'opacity-1'} bg-green-700 text-white p-1 ml-2 text-sm rounded-md show hover:bg-green-800 focus:bg-green-800 duration-300`} />
                <ButtonElementLoading size="md" onClick={deleteHandler} text="حذف" isSubmit={getIsSubmit('delete')} className="bg-red-600 hover:bg-red-700 focus:bg-red-700 duration-300" />
            </div>

        </div>
    )
}

export default DataSetItemUsers