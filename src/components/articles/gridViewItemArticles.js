import useDeleteAndUpdateArticles from '../../hooks/useDeleteAndUpdateArticles'
import {timestampToPersianDate} from '../../modules/helperFunctions'
import TableRowElement from '../global/elements/tableRowElement'
import TableDataElement from '../global/elements/tableDataElement'
import ButtonElementLoading from '../global/loadings/buttonElementLoading'
import SelectItemArticles from './selectItemArticles'

const GridViewItemArticles = ({id, title, status, createdAt}) => {

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler} = useDeleteAndUpdateArticles(id)

    return (
        <TableRowElement isSelect={isSelect}>
            <TableDataElement>
                <SelectItemArticles type="gridview" articleId={id} isSelect={isSelect} setIsSelect={setIsSelect} />
            </TableDataElement>
            <TableDataElement>{title.length > 30 ? title.slice(0, 30) + '...' : title}</TableDataElement>
            <TableDataElement>{status === 'draft' ? <div>پیش نویس</div> : <div className="flex justify-center space-x-reverse space-x-2 text-green-600"><span className="pr-6">منتشر شده</span><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>}</TableDataElement>
            <TableDataElement>{timestampToPersianDate(createdAt)}</TableDataElement>
            <TableDataElement>
                <ButtonElementLoading onClick={updateHandler} text="ویرایش" isSubmit={getIsSubmit()} size="sm" className={`${getIsSubmit() !== '' ? 'opacity-60' : 'opacity-1'} bg-green-700 text-white p-1 ml-2 text-sm rounded-md show hover:bg-green-800 focus:bg-green-800 duration-300`} />
                <ButtonElementLoading onClick={deleteHandler} text="حذف" isSubmit={getIsSubmit('delete')} size="sm" className="bg-red-600 hover:bg-red-700 focus:bg-red-700 duration-300" />
            </TableDataElement>
        </TableRowElement>
    )
}

export default GridViewItemArticles