import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../MainComponents/Main";
import Home from "../Pages/Home/Home/Home";
import Banner from "../Pages/Home/Banner/Banner";

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
            path: '/banner',
            element: <Banner></Banner>
        }
      ]
    },
  ]);