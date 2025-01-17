import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../MainComponents/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

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
  ]);