import ReactPaginate from 'react-paginate'

const PaginateUsers = ({pageHandler, pageCount}) => (
    <ReactPaginate
        breakLabel=". . ."
        nextLabel="بعدی"
        previousLabel="قبلی"
        onPageChange={pageHandler}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="flex items-center justify-between md:justify-start mt-8 mb-4 select-none"
        pageLinkClassName="px-4 py-2 text-gray-600 dark:text-gray-100 mx-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 rounded-md hidden md:block select-none"
        activeLinkClassName="!bg-indigo-700 !text-white select-none"
        previousClassName="text-gray-600 dark:text-gray-100 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 rounded-md ml-1 select-none"
        nextClassName="text-gray-600 dark:text-gray-100 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 rounded-md mr-1 select-none"
        breakClassName="px-3 text-gray-600 dark:text-gray-100 select-none"
    />
)

export default PaginateUsers