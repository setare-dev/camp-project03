import {random} from '../../../modules/helperFunctions'
import LabelElement from './labelElement'

const SelectElement = ({label, keyname, value, type = 'string' ,options, error, inputHandler}) => (
    <div className="mb-5">
        <LabelElement text={label} />
        <select value={value} onChange={({target: {value}}) => inputHandler(keyname, value, type)} className="w-full mt-1 p-[.66rem] rounded-lg dark:bg-gray-800 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none">
            {options.map(option => <option key={random(1000, 10000)} value={option.value}>{option.text}</option>)}
        </select>
        <small className="text-red-500">{error}</small>
    </div>
)

export default SelectElement