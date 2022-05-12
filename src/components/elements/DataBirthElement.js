const DataBirthElement = ({label, day, month, year, errors, inputHandler}) => (
    <div className="mb-4">
        <label className="text-gray-500 dark:text-gray-100">{label}</label>

        <div className="bg-white dark:bg-gray-800 border dark:border-0 border-gray-300 py-1 bg-gray-350 bg-opacity-10 ltr rounded-lg flex justify-around items-center dark:!bg-dark-900 dark:!text-white mt-3">
            <input value={day} onChange={(e) => inputHandler('day', e.target.value)}  className="w-12 h-10 text-gray-700 dark:text-white border-transparent bg-transparent px-1 border-none placeholder-gray-330 text-center outline-none border dark:border-0 border-gray-300 focus:ring-2 rounded-lg" dir="ltr" placeholder="روز" type="number" />
                <span className="text-xs">/</span>
            <input value={month} onChange={(e) => inputHandler('month', e.target.value)}  className="w-12 h-10 text-gray-700 dark:text-white border-transparent bg-transparent px-1 border-none placeholder-gray-330 text-center outline-none border dark:border-0 border-gray-300 focus:ring-2 rounded-lg" dir="ltr" placeholder="ماه" type="number" />
                <span className="text-xs">/</span>
            <input value={year} onChange={(e) => inputHandler('year', e.target.value)}  className="w-14 text-gray-700 dark:text-white h-10 border-transparent bg-transparent px-1 border-none placeholder-gray-330 text-center outline-none border dark:border-0 border-gray-300 focus:ring-2 rounded-lg" dir="ltr" placeholder="سال" type="number" />
        </div>
        
        <small className="text-red-500">{'day' in errors || 'month' in errors || 'year' in errors ? 'فرمت نامعتبر است' : ''}</small>
    </div>
)

export default DataBirthElement