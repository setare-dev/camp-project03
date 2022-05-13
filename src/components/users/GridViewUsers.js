import {useContext} from 'react'
import UsersContext from '../../states/contexts/users'
import GridViewItem from './GridViewItemUsers'
import TableElement from '../elements/TableElement'
import TableHead from '../table/TableHead'
import TableFooter from '../table/TableFooter'

/**
 * The task of this component is to create a data gridview from the list of users.
 */
const GridViewUsers = () => {
    const {state} = useContext(UsersContext)

    return (
        <TableElement>
            <TableHead titles={['نام', 'متولد', 'جنسیت', 'ایمیل', 'کاربری', 'تاریخ عضویت', 'عملیات']}/>
            <tbody>{state.users.map(user => <GridViewItem key={user.id} {...user} />)}</tbody>
            <TableFooter data={state.users} colSpan="7"/>
        </TableElement>
    )
}

export default GridViewUsers