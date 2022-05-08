export default ({cols = 2, children}) => {
    return (
        <div className={`grid md:grid-cols-${cols} gap-x-4`}>
            {children}
        </div>
    )
}