export default ({label, keyname, value, error, inputHandler, ...properties}) => {
    return (
        <div className="mb-4">
            <label className="text-gray-500 dark:text-gray-100">{label}</label>
            <input {...properties} value={value} onChange={(e) => inputHandler(keyname, e.target.value)} className="text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 w-full p-3 mt-3 rounded-md outline-none border dark:border-0 border-gray-300 focus:ring-2" />
            <small className="text-red-500">{error}</small>
        </div>
    )
}