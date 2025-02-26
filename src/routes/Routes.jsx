import {
    createBrowserRouter,
   
  } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/404Page";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ShopPage from "../pages/Shop";

import Cart from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import InvoicePage from "../pages/Invoice";
// import Dashboard from "../pages/Admin/Dashboard";
import SellerDashboard from "../pages/Seller/Dashboard";
import ManageBanner from "../pages/Admin/ManageBanner";
import PaymentHistory from "../pages/User/UserDashboard";
import CategoryDetails from "../pages/CategoryDetails";
import MedicineCategoryPage from "../pages/CategoryDetails";
import AdminDashboard from "../pages/Admin/Homepage";
import ManageUsers from "../pages/Admin/ManageUsers";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageCategories from "../pages/Admin/ManageCategories";
import PaymentManagement from "../pages/Admin/PaymentManagement";
import SalesReport from "../pages/Admin/SalesReport";
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
          element: <PrivateRoute><CheckoutPage></CheckoutPage></PrivateRoute>
        },
        {
          path: '/invoice',
          element: <PrivateRoute><InvoicePage></InvoicePage></PrivateRoute>
        },
        // {
        //   path: '/adminDashboard',
        //   element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
        // },
        {
          path: '/manageUser',
          element: <ManageUsers></ManageUsers>
        },
        {
          path: '/sellerDashboard',
          element: <PrivateRoute><SellerDashboard></SellerDashboard></PrivateRoute>
        },
        {
          path: '/banner',
          element: <ManageBanner></ManageBanner>
        },
        {
          path: '/userDashboard',
          element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
        },
        {
          path: '/categories/:category',
          loader: ({params}) => fetch(`https://assignment-12-blue.vercel.app/allMedicines/${params.category}`),
          element: <MedicineCategoryPage></MedicineCategoryPage>
        },
       








        

      ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
      },
      
      {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
          {
            
              path: '/dashboard/profile',
              element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            
            
          },
          {
            path: '',
            element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
          },
          {
            path: '/dashboard/adminDashboard',
            element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
          },
          {
            path: '/dashboard/admin',
            element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
          },
          {
            path: '/dashboard/manageCategories',
            element: <PrivateRoute><ManageCategories></ManageCategories></PrivateRoute>
          },
          {
            path: '/dashboard/manageBanner',
            element: <PrivateRoute><ManageBanner></ManageBanner></PrivateRoute>
          },
          {
            path: '/dashboard/manageUser',
            element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
          },
          {
            path: '/dashboard/paymentManage',
            element: <PrivateRoute><PaymentManagement></PaymentManagement></PrivateRoute>
          },
          {
            path: '/dashboard/salesReport',
            element: <PrivateRoute><SalesReport></SalesReport></PrivateRoute>
          },
          
          
        ]
        
      },
  ]);