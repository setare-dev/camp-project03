import {random} from './../../modules/HelperFunctions'
import LabelElement from './LabelElement'

const SelectElement = ({label, keyname, value, options, error, inputHandler}) => (
    <div className="mb-5">
        <LabelElement text={label} />
        <select value={value} onChange={({target: {value}}) => inputHandler(keyname, Boolean(value))} className="w-full mt-1 p-[.66rem] rounded-lg dark:bg-gray-800 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
            {options.map(option => <option key={random(1000, 10000)} value={Boolean(option.value)}>{option.text}</option>)}
        </select>
        <small className="text-red-500">{error}</small>
    </div>
)

export default SelectElement