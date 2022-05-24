import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <Link to="/">خانه</Link>
            <Link to="/admin/users">کاربران</Link>
        </>
    )
}

export default Navbar