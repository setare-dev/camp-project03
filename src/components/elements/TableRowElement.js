const TableRowElement = ({children}) => (
    <tr className="even:bg-gray-200/50 dark:even:bg-gray-700/50 hover:bg-gray-300 dark:hover:bg-gray-600 duration-500">
        {children}
    </tr>
)

export default TableRowElement