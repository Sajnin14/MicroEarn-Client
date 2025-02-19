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
import PaymentHistory from "../Pages/Dashboard/BuyerDashboard/PaymentHistory/PaymentHistory";
import TaskList from "../Pages/Dashboard/WorkerDashboard/TaskList/TaskList";
import TaskDetails from "../Pages/Dashboard/WorkerDashboard/TaskList/TaskDetails/TaskDetails";
import WorkerSubmissions from "../Pages/Dashboard/WorkerDashboard/WorkersSubmission/WorkerSubmissions";
import Withdrawals from "../Pages/Dashboard/WorkerDashboard/Withdrawals/Withdrawals";
import BuyerHome from "../Pages/Dashboard/BuyerDashboard/BuyerHome/BuyerHome";
import WorkerHome from "../Pages/Dashboard/WorkerDashboard/WorkerHome/WorkerHome";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUser/ManageUsers";
import ManageTask from "../Pages/Dashboard/AdminDashboard/ManageTasks/ManageTask";
import Blogs from "../Pages/Blogs/Blogs";


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
            path: '/blogs',
            element: <Blogs></Blogs>
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
          path: '/dashboard',
          element: <Dashboard></Dashboard>
        },
        
        // buyer routes

        {
          path: 'buyerHome',
          element: <PrivateRoute><BuyerHome></BuyerHome></PrivateRoute>
        },
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
          loader: ({params}) => fetch(`https://pico-server.vercel.app/tasks/email/${params.id}`)
        },
        {
          path: 'paymentHistory',
          element: <PrivateRoute><PaymentHistory></PaymentHistory> </PrivateRoute>
        },

        // worker routes
        {
          path: 'taskList',
          element: <TaskList></TaskList>
        },
        {
          path: 'taskDetails/:id',
          element: <TaskDetails></TaskDetails>,
          // loader: ({params}) => fetch(`https://pico-server.vercel.app/tasks/id/${params.id}`)
          loader: ({params}) => fetch(`https://pico-server.vercel.app/tasks/email/${params.id}`)

        },
        {
          path: 'workerSubmissions',
          element: <PrivateRoute><WorkerSubmissions></WorkerSubmissions></PrivateRoute>
        },
        {
          path: 'withdrawals',
          element: <PrivateRoute><Withdrawals></Withdrawals></PrivateRoute>
        },

        {
          path: 'workerHome',
          element: <PrivateRoute><WorkerHome></WorkerHome></PrivateRoute>
        },

        // admin routes

        {
          path: 'adminHome',
          element: <PrivateRoute><AdminHome></AdminHome></PrivateRoute>
        },
        {
          path: 'manageUsers',
          element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
        },
        {
          path: 'manageTasks',
          element: <PrivateRoute><ManageTask></ManageTask></PrivateRoute>
        }
      ]
    }
  ]);