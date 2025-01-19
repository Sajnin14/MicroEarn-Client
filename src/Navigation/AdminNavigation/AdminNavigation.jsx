import { FaHome, FaList, FaUserShield } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const AdminNavigation = () => {
    return (
        <ul className="menu text-xl font-semibold p-3">
        <li><NavLink to='/dashboard/workerHome'> <FaHome></FaHome>Admin Home</NavLink></li>

        <li><NavLink to='/dashboard/manageTasks'> <FaList></FaList>Manage Tasks</NavLink></li>

        <li><NavLink to='/dashboard/manageUsers'> <FaUserShield /> Manage Users</NavLink></li>


    </ul>
    );
};

export default AdminNavigation;