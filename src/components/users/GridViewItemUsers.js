import useDeleteAndUpdateUsers from '../../hooks/useDeleteAndUpdateUsers'
import {timestampToPersianDate} from '../../modules/helperFunctions'
import TableRowElement from '../global/elements/tableRowElement'
import TableDataElement from '../global/elements/tableDataElement'
import ButtonElementLoading from '../global/loadings/buttonElementLoading'
import SelectItemUsers from './selectItemUsers'

const GridViewItemUsers = ({id, name, family, day, month, year, gender, email, isAdmin, createdAt}) => {

    const {isDeliting, isSelect, setIsSelect, deleteHandler, updateHandler} = useDeleteAndUpdateUsers(id)

    return (
        <TableRowElement isSelect={isSelect}>
            <TableDataElement>
                <SelectItemUsers type="gridview" userId={id} isSelect={isSelect} setIsSelect={setIsSelect} />
            </TableDataElement>
            <TableDataElement>{name} {family}</TableDataElement>
            <TableDataElement>{year}/{month}/{day}</TableDataElement>
            <TableDataElement>{gender ? 'زن' : 'مرد'}</TableDataElement>
            <TableDataElement>{email}</TableDataElement>
            <TableDataElement>{isAdmin ? 'مدیر' : 'معمولی'}</TableDataElement>
            <TableDataElement>{timestampToPersianDate(createdAt)}</TableDataElement>
            <TableDataElement>
                <div className="flex items-center mx-auto" style={{width: 100}}>
                    <button disabled={isDeliting ? 'disabled' : ''} onClick={updateHandler} className={`${isDeliting ? 'opacity-60' : 'opacity-1'} bg-green-700 text-white p-1 ml-2 text-sm rounded-md show hover:bg-green-800 focus:outline-none`}>ویرایش</button>
                    <ButtonElementLoading onClick={deleteHandler} text="حذف" isSubmit={isDeliting} size="sm" className="bg-red-600 hover:bg-red-700 focus:bg-red-700" />
                </div>
            </TableDataElement>
        </TableRowElement>
    )
}

export default GridViewItemUsers