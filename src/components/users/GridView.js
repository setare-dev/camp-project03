import {useContext} from 'react'
import UsersContext from '../../states/contexts/users'
import GridViewItem from './GridViewItem'
import {EMPTY_DATA} from '../../constants/responses'

/**
 * The task of this component is to create a data gridview from the list of users.
 */
const GridViewUsers = () => {
    const {state} = useContext(UsersContext)

    return (
        <div className="my-4 overflow-y-auto">
            <table className="w-full">
                <thead className="bg-gray-900 text-white">
                    <tr>
                        <th className="p-4">نام</th>
                        <th className="p-4">متولد</th>
                        <th className="p-4">جنسیت</th>
                        <th className="p-4">ایمیل</th>
                        <th className="p-4">کاربری</th>
                        <th className="p-4 truncate">تاریخ عضویت</th>
                        <th className="p-4">عملیات</th>
                    </tr>
                </thead>

                <tbody>
                    {state.users.map(user => <GridViewItem key={user.id} {...user} />)}
                </tbody>

                {!state.users.length ? <tfoot className="text-center text-gray-500"><tr><td colSpan="7" className="p-4 text-center text-gray-500 dark:text-gray-100">{EMPTY_DATA}</td></tr></tfoot> : null}
            </table>
        </div>
    )
}

export default GridViewUsers