import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../MainComponents/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import MainDashboard from "../MainComponents/MainDashboard";
import PrivateRoute from "./PrivateRoute";
import AddTask from "../Pages/Dashboard/BuyerDashboard/AddTask/AddTask";
import PurchaseCoin from "../Pages/Dashboard/PurchaseCoin/PurchaseCoin";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        }
      ]
    },

    // routes for Dashboard

    {
      path: '/dashboard',
      element: <PrivateRoute><MainDashboard></MainDashboard></PrivateRoute>,
      children: [
        {
          path: 'addTask',
          element: <AddTask></AddTask>
        },
        {
          path: 'purchaseCoin',
          element: <PurchaseCoin></PurchaseCoin>
        }
      ]
    }
  ]);