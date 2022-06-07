const ButtonElementLoading = ({text, isSubmit, className, size = 'lg', ...rest}) => (
    <button {...rest} disabled={isSubmit != '' || isSubmit === 'false' ? 'disabled' : ''} type="submit" className={`rounded-md ${size === 'sm' ? 'p-1 text-sm' : size === 'md' ? 'px-4 py-2 text-sm' : 'px-4 py-2'} text-white focus:outline-none ml-2 sm:w-auto ${className}`}>
        <div className="relative">
            {
                isSubmit !== '' & isSubmit !== 'false' ?
                    <span className="absolute left-[calc(50%-16px)] top-[calc(50%-8px)] flex ml-2 w-4 h-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white"></span>
                        <span className={`relative inline-flex rounded-full bg-white w-4 h-4`}></span>
                    </span>
                : null
            }
            <span className={`${isSubmit != '' || isSubmit === 'false' ? 'opacity-60' : ''}`}>{text}</span>
        </div>
    </button>
)

export default ButtonElementLoading