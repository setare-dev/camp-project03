import LabelElement from './labelElement'

const TextareaElement = ({rows = 3, label, keyname, value, error, inputHandler, ...rest}) => (
    <div className="mb-5">
        <LabelElement text={label} />
        <textarea {...rest} rows={rows} onChange={({target: {value}}) => inputHandler(keyname, value)} value={value} className="text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 w-full p-3 mt-1 rounded-md outline-none border dark:border-0 border-gray-300 focus:ring-2"></textarea>
        <small className="text-red-500 relative -top-2">{error}</small>
    </div>
)

export default TextareaElement