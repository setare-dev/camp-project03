import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import {setTodosArchive, setTodosCurrentPage, setSelectedRows} from '../store/slices/todosSlice'
import {setIsLoading} from '../store/slices/globalSlice'
import HeaderTodos from '../components/todos/headerTodos'
import ModalFormTodos from '../components/todos/formTodos'
import GridViewTodos from '../components/todos/gridViewTodos'
import DataSetTodos from '../components/todos/dataSetTodos'
import FilterTodos from '../components/todos/filterTodos'
import Pagination from '../components/global/pagination'
import {getTodosService} from '../services/todosService'

const TodosPage = () => {

    const {todosArchive, filterValue, pagination: {totalCount, pageSize, currentPage}} = useSelector(state => state.todos)

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    const [viewType, setViewType] = useState(localStorage.viewType ? localStorage.viewType !== 'false' : true)

    useEffect(() => {
        document.title = 'کارها'
        const page = searchParams.get('page') ? Number(searchParams.get('page')) : currentPage
        setSearchParams({page, filter: filterValue})
        pageChangeHandler(page)
    }, [])
    
    const changeViewType = type => {
        setViewType(type)
        dispatch(setSelectedRows([]))
        localStorage.viewType = type
    }

    const pageChangeHandler = async (page) => {
        if (!todosArchive.filter(item => item.page === page).length) {
            try {
                dispatch(setIsLoading(true))
                const filter = searchParams.get('filter') ? searchParams.get('filter') : filterValue
                const {data: {data, meta: {totalDocs, limit}}} = await getTodosService(page, filter === 'all' || filter === 'status:all' ? null : filter)
                dispatch(setTodosArchive({page, data, totalDocs, limit}))
                window.scrollTo({top: 0, behavior: 'smooth'})
            } finally {
                dispatch(setIsLoading(false))
            }
        } else {
            dispatch(setTodosCurrentPage(page))
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    }

    return (
        <div className="animate-slow-1000">

            <HeaderTodos viewType={viewType} changeViewType={changeViewType} />

            <FilterTodos />

            {viewType ? <GridViewTodos /> : <DataSetTodos />}

            <Pagination onPageChange={page => pageChangeHandler(page)} currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} filter={searchParams.get('filter')} />

            <ModalFormTodos />
            
        </div>
    )
}

export default TodosPage