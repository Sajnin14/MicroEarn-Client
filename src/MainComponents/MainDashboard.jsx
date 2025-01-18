import { Outlet } from "react-router-dom";
import BuyerNavigation from "../Navigation/Buyrenavigation/BuyerNavigation";
import DashboardNav from "../Sections/DashboardNav/DashboardNav";
import Footer from "../Sections/Footer/Footer";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";
import WorkerNavigation from "../Navigation/WorkerNavigation/WorkerNavigation";
import AdminNavigation from "../Navigation/AdminNavigation/AdminNavigation";


const MainDashboard = () => {

  

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentUserInfo, setCurrentUserInfo] = useState();
  axiosSecure.get(`/users/${user.email}`)
  .then(res => {
    setCurrentUserInfo(res.data);
    console.log(res.data);
  })


    return (
        <div>
          <DashboardNav></DashboardNav>  
          <div className="grid grid-cols-4">
            <div className="col-span-1 bg-yellow-200">
              {
                currentUserInfo?.role === 'buyer' && <BuyerNavigation></BuyerNavigation>
              }

              {
                currentUserInfo?.role === 'worker' && <WorkerNavigation></WorkerNavigation>
              }
              
              {
                currentUserInfo?.role === 'admin' && <AdminNavigation></AdminNavigation>
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