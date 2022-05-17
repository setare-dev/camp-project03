import GridViewItem from './GridViewItemUsers'
import TableElement from '../elements/TableElement'
import TableHead from '../table/TableHead'
import TableFooter from '../table/TableFooter'

/**
 * The task of this component is to create a data gridview from the list of users.
 */
const GridViewUsers = ({users}) => (
    <TableElement>
        <TableHead titles={['نام', 'متولد', 'جنسیت', 'ایمیل', 'کاربری', 'تاریخ عضویت', 'عملیات']}/>
        <tbody>{users.map(user => <GridViewItem key={user.id} {...user} />)}</tbody>
        <TableFooter dataLength={users.length} colSpan="8"/>
    </TableElement>
)

export default GridViewUsers