const ButtonElementLoading = ({text, isSubmit, className, size, ...rest}) => (
    <button {...rest} disabled={isSubmit ? 'disabled' : ''} type="submit" className={`${isSubmit ? 'opacity-60' : 'opacity-1'} rounded-md ${size === 'sm' ? 'p-1 text-sm' : 'px-4 py-2'} text-white focus:outline-none ml-3 sm:w-auto ${className}`}>
        <div className="flex items-center">
            {
                isSubmit ?
                    <span className={`relative flex ml-2 ${size === 'sm' ? 'h-2 w-2' : 'h-3 w-3'}`}>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-100 opacity-75"></span>
                        <span className={`relative inline-flex rounded-full bg-white ${size === 'sm' ? 'h-2 w-2' : 'h-3 w-3'}`}></span>
                    </span>
                : null
            }
            <span>{text}</span>
        </div>
    </button>
)

export default ButtonElementLoading