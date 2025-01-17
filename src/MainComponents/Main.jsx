import { Outlet } from "react-router-dom";
import Navbar from "../Sections/Navbar/Navbar";
import Footer from "../Sections/Footer/Footer";


const Main = () => {
    return (
        <>
        <Navbar></Navbar>
        <div className="w-11/12 mx-auto">
            <Outlet></Outlet> 
        </div>
        <Footer></Footer>
        </>
        
    );
};

export default Main;