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
import PurchaseCoin from "../Pages/Dashboard/BuyerDashboard/PurchaseCoin/PurchaseCoin";
import MyTasks from "../Pages/Dashboard/BuyerDashboard/MyTasks/MyTasks";
import UpdateTask from "../Pages/Dashboard/BuyerDashboard/MyTasks/updateTask";


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
          element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
        },
        {
          path: 'purchaseCoin',
          element: <PrivateRoute><PurchaseCoin></PurchaseCoin></PrivateRoute>
        },
        {
          path: 'myTasks',
          element: <PrivateRoute><MyTasks></MyTasks> </PrivateRoute>
        },
        {
          path: 'updateTask/:id',
          element: <PrivateRoute><UpdateTask></UpdateTask> </PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/tasks/email/${params.id}`)
        }
      ]
    }
  ]);