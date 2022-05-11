const TableHead = ({titles, bgColor = 'bg-gray-900', textColor = 'text-white'}) => (
    <thead className={`${bgColor} ${textColor}`}>
        <tr>
            {titles.map((title, index) => <th key={index} className="p-4 truncate">{title}</th>)}
        </tr>
    </thead>
)

export default TableHead