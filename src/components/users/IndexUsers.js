import {useContext, useState, useEffect} from 'react'
import UsersContext from '../../states/contexts/users'
import {setModalStatus} from '../../states/actions/users'
import HeaderUsers from './HeaderUsers'
import ModalFormUsers from './ModalFormUsers'
import GridViewUsers from './GridViewUsers'
import DataSetUsers from './DataSetUsers'
import PaginateUsers from './PaginateUsers'
import FilterUsers from './FilterUsers'

/**
 * This is the parent component for the users page.
 */
const IndexUsers = ({itemsPerPage = process.env.REACT_APP_PAGINATE_PER_PAGE ?? 2}) => {

    const {state: {users, filterValue}, dispatch} = useContext(UsersContext)

    /*
     * true: GridView, false: DataSet
     */
    const [viewType, setViewType] = useState(localStorage.viewType ? localStorage.viewType !== 'false' : true)

    /**
     * We start with an empty list of items.
     */
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)

    /**
     * Here we use item offsets; we could also use page offsets.
     * following the API or data you're working with.
     */
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        /**
         * Fetch items from another resources.
         */
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(users.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(users.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, users])

    useEffect(() => {
        /**
         * When the filterValue changes, everything has to be reset.
         */
        setPageCount(0)
        setItemOffset(0)
    }, [filterValue])

    /**
     * Switch between pages.
     */
    const pageHandler = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length
        setItemOffset(newOffset)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    /**
     * This function is to change the display mode of information and save this mode in local storage.
     * @param type This parameter contains the type of display of user information.
     */
    const changeViewType = type => {
        setViewType(type)
        localStorage.viewType = type
    }

    /**
     * Display form medal for registering a new user.
     */
    const showModalForCreateForm = () => {
        dispatch(setModalStatus(true))
        document.querySelector('body').classList.add('overflow-hidden')
    }

    return (
        <div className="container mx-auto pt-6 pb-4 px-4 md:px-2">

            <HeaderUsers viewType={viewType} changeViewType={changeViewType} showModalForCreateForm={showModalForCreateForm} />

            <FilterUsers />

            {viewType ? <GridViewUsers users={currentItems} /> : <DataSetUsers users={currentItems} />}

            {pageCount > 1 ? <PaginateUsers pageHandler={pageHandler} pageCount={pageCount} /> : null}

            <ModalFormUsers/>

        </div>
    )
}

export default IndexUsers