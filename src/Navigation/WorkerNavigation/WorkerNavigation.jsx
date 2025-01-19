import { FaHome, FaList } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SiGoogletasks } from "react-icons/si";
import { NavLink } from "react-router-dom";


const WorkerNavigation = () => {

    return (
        <ul className="menu text-xl font-semibold p-3">
            <li><NavLink to='/dashboard/workerHome'> <FaHome></FaHome>Worker Home</NavLink></li>

            <li><NavLink to='/dashboard/taskList'> <FaList></FaList>Task List</NavLink></li>

            <li><NavLink to='/dashboard/workerSubmissions'> <SiGoogletasks /> My Submissions</NavLink></li>

            <li><NavLink to='/dashboard/withdrawals'> <FaArrowUpRightFromSquare /> Withdrawals </NavLink></li>

        </ul>
    );
};

export default WorkerNavigation;