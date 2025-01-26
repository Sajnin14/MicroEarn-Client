import { Outlet } from "react-router-dom";
import BuyerNavigation from "../Navigation/Buyrenavigation/BuyerNavigation";
import DashboardNav from "../Sections/DashboardNav/DashboardNav";
import Footer from "../Sections/Footer/Footer";
import WorkerNavigation from "../Navigation/WorkerNavigation/WorkerNavigation";
import AdminNavigation from "../Navigation/AdminNavigation/AdminNavigation";
import useUser from "../hooks/useUser";


const MainDashboard = () => { 

  const [userInfo] = useUser();
  
    return (
        <div>
          <DashboardNav></DashboardNav>  
          <div className="grid grid-cols-4">
            <div className="col-span-1 bg-yellow-200 py-10">
              {
                userInfo?.role === 'buyer' && <BuyerNavigation></BuyerNavigation>
              }

              {
                userInfo?.role === 'worker' && <WorkerNavigation></WorkerNavigation>
              }
              
              {
                userInfo?.role === 'admin' && <AdminNavigation></AdminNavigation>
              }
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