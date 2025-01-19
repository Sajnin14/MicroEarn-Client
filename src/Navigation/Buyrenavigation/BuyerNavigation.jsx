import { FaCoins, FaHome, FaTasks } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const BuyerNavigation = () => {
    
    return (
        <ul className="menu text-xl font-semibold p-3">
            <li><NavLink to='/dashboard/buyerHome'> <FaHome></FaHome>Buyer Home</NavLink></li>

            <li><NavLink to='/dashboard/addTask'> <FaTasks></FaTasks> Add New Task</NavLink></li>

            <li><NavLink to='/dashboard/myTask'> <VscTasklist /> My Task</NavLink></li>

            <li><NavLink to='/dashboard/purchaseCoin'> <FaCoins></FaCoins> Purchase Coin
            </NavLink></li>

            <li><NavLink to='/dashboard/paymentHistory'> <MdOutlineWorkHistory /> Payment history </NavLink></li>

        </ul>
    );
};

export default BuyerNavigation;