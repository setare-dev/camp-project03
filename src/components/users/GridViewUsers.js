import GridViewItemUsers from './gridViewItemUsers'
import TableElement from '../global/elements/tableElement'
import TableHead from '../global/table/tableHead'
import TableFooter from '../global/table/tableFooter'

const GridViewUsers = ({users}) => (
    <TableElement>
        <TableHead titles={['نام', 'متولد', 'جنسیت', 'ایمیل', 'کاربری', 'تاریخ عضویت', 'عملیات']}/>
        <tbody>{users.map(user => <GridViewItemUsers key={user.id} {...user} />)}</tbody>
        <TableFooter dataLength={users.length} colSpan="8"/>
    </TableElement>
)

export default GridViewUsers