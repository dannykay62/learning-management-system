import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className='card'>
            <div className='list-group'>
                <Link to='/user-dashboard' className='list-group-item list-group-item-action'>Dashboard</Link>
                <Link to='/my-courses' className='list-group-item list-group-item-action'>My Courses</Link>
                <Link to='/favorite-courses' className='list-group-item list-group-item-action'>Favorite Courses</Link>
                <Link to='/recommended-courses' className='list-group-item list-group-item-action'>Recommended</Link>
                <Link to='/profile-settings' className='list-group-item list-group-item-action'>Profile Settings</Link>
                <Link to='/change-password' className='list-group-item list-group-item-action'>Change Password</Link>
                <Link to='/user-logout' className='list-group-item list-group-item-action text-danger'>Logout</Link>
            </div>
        </div>
    );
}

export default Sidebar;