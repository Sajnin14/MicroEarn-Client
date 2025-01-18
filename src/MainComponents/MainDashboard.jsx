import { Outlet } from "react-router-dom";
import BuyerNavigation from "../Navigation/Buyrenavigation/BuyerNavigation";
import DashboardNav from "../Sections/DashboardNav/DashboardNav";
import Footer from "../Sections/Footer/Footer";

const MainDashboard = () => {
    return (
        <div>
          <DashboardNav></DashboardNav>  
          <div className="grid grid-cols-4">
            <div className="col-span-1 bg-yellow-300">
                <BuyerNavigation></BuyerNavigation>
            </div>
            <div className="col-span-3">
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
          </div>
         
        </div>
    );
};

export default MainDashboard;