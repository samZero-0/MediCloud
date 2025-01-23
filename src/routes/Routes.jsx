import {
    createBrowserRouter,
   
  } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/404Page";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import NotFound from "../pages/404Page"
// import Homepage from "../pages/Homepage";
// import AllFoods from "../pages/AllFoods";
// import SingleFoodPage from "../pages/SingleFoodPage";
// import Purchase from "../pages/Purchase";
// import PrivateRoute from "./PrivateRoute";
// import MyOrders from "../pages/MyOrders";
// import AddFood from "../pages/AddFood";
// import MyFoods from "../pages/MyFoods";
// import Gallery from "../pages/Gallery";


  export const router = createBrowserRouter([
   
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        
        {
          path: '',
          element: <h1>hello</h1>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },




        

      ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
      },
      
  ]);