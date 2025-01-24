import {
    createBrowserRouter,
   
  } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/404Page";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ShopPage from "../pages/Shop";
import CategoryDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import InvoicePage from "../pages/Invoice";
import Dashboard from "../pages/Admin/Dashboard";
import SellerDashboard from "../pages/Seller/Dashboard";
import ManageBanner from "../pages/Admin/ManageBanner";
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
          element:<Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/shop',
          element: <ShopPage></ShopPage>
        },
        {
          path: '/details',
          element: <CategoryDetails></CategoryDetails>
        },
        {
          path: '/cart',
          element: <Cart></Cart>
        },
        {
          path: '/checkoutPage',
          element: <CheckoutPage></CheckoutPage>
        },
        {
          path: '/invoice',
          element: <InvoicePage></InvoicePage>
        },
        {
          path: '/dashboard',
          element: <Dashboard></Dashboard>
        },
        {
          path: '/seller',
          element: <SellerDashboard></SellerDashboard>
        },
        {
          path: '/banner',
          element: <ManageBanner></ManageBanner>
        },
        








        

      ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
      },
      
  ]);