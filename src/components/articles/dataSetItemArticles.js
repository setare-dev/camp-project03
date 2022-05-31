import useDeleteAndUpdateArticles from '../../hooks/useDeleteAndUpdateArticles'
import {timestampToPersianDate} from '../../modules/helperFunctions'
import DataSetRowElement from '../global/elements/dataSetRowElement'
import SelectItemArticles from './selectItemArticles'

const DataSetItemArticles = ({id, title, description, status, createdAt}) => {

    const {isDeliting, isSelect, setIsSelect, deleteHandler, updateHandler} = useDeleteAndUpdateArticles(id)

    return (
        <div className={`${isSelect ? 'bg-indigo-100 dark:bg-slate-400/50' : 'bg-gray-200 dark:bg-gray-900'} p-3 rounded-lg space-y-3 relative`}>
            
            <SelectItemArticles type="dataset" articleId={id} isSelect={isSelect} setIsSelect={setIsSelect} />

            <DataSetRowElement>
                <div>{title.length > 30 ? title.slice(0, 30) + '...' : title}</div>
            </DataSetRowElement>

            <DataSetRowElement>
                <div className="min-h-24">{description}</div>
            </DataSetRowElement>

            <DataSetRowElement>
                <div className="ml-1 opacity-60">وضعیت</div>
                <div>{status === 'draft' ? <span>پیش نویس</span> : <div className="flex space-x-reverse space-x-2 text-green-600"><span>منتشر شده</span><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>}</div>
            </DataSetRowElement>

            <DataSetRowElement>
                <div className="ml-1 opacity-60">تاریخ ثبت</div>
                <div>{timestampToPersianDate(createdAt)}</div>
            </DataSetRowElement>

            <div className="grid grid-cols-2">
                <button disabled={isDeliting ? 'disabled' : ''} onClick={updateHandler} className={`${isDeliting ? 'opacity-60' : 'opacity-1'} bg-green-700 text-white p-2 text-sm rounded-r-md hover:bg-green-800 focus:outline-none`}>ویرایش</button>
                <button onClick={deleteHandler} disabled={isDeliting ? 'disabled' : ''} className={`${isDeliting ? 'opacity-60' : 'opacity-1'} bg-red-600 text-white p-2 text-sm rounded-l-md hover:bg-red-700 focus:outline-none`}>
                    <div className="flex items-center justify-center">
                        {isDeliting ? <span className="relative flex w-3 h-3 ml-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-100 opacity-75"></span><span className="relative inline-flex rounded-full bg-white h-3 w-3"></span></span> : null}
                        <span>حذف</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default DataSetItemArticles