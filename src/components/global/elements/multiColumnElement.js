const MultiColumnElement = ({cols = 2, gap = 'gap-x-4', children}) => (
    <div className={`grid md:grid-cols-${cols} ${gap}`}>
        {children}
    </div>
)

export default MultiColumnElement