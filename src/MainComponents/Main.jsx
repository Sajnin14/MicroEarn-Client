import { Outlet } from "react-router-dom";
import Navbar from "../Sections/Navbar/Navbar";
import Footer from "../Sections/Footer/Footer";


const Main = () => {
    return (
        <>
        <Navbar></Navbar>
        <div>
            <Outlet></Outlet> 
        </div>
        <Footer></Footer>
        </>
        
    );
};

export default Main;