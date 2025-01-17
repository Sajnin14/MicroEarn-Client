import { Outlet } from "react-router-dom";
import Navbar from "../Sections/Navbar/Navbar";


const Main = () => {
    return (
        <>
        <Navbar></Navbar>
        <div className="w-11/12 mx-auto">
            <Outlet></Outlet> 
        </div>
        </>
        
    );
};

export default Main;