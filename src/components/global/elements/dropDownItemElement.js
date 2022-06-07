const DropDownItemElement = ({children, position = 'center', onClick}) => (
    <div onClick={onClick} className={`${position === 'top' ? 'hover:rounded-t-md' : position === 'bottom' ? 'hover:rounded-b-md' : ''} flex items-center space-x-reverse space-x-2 py-3 px-2 text-sm text-gray-500 dark:text-gray-100 cursor-pointer hover:bg-gray-100 duration-300 hover:dark:bg-gray-800 select-auto`}>
        {children}
    </div>
)

export default DropDownItemElement