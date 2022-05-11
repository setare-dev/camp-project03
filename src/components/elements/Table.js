const TableElement = ({children}) => (
    <div className="my-4 overflow-y-auto">
        <table className="w-full">
            {children}
        </table>
    </div>
)

export default TableElement