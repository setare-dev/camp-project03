const MultiColumnElement = ({cols = 2, children}) => (
    <div className={`grid md:grid-cols-${cols} gap-x-4`}>
        {children}
    </div>
)

export default MultiColumnElement