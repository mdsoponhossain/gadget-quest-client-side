import {
    createBrowserRouter,
} from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Products from "../Pages/Products/Products";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Dashboard from "../Dashboard/DashboardLayout/Dashboard";
import MyProfile from "../Dashboard/Pages/MyProfile/MyProfile";
import ManageUsers from "../Dashboard/Pages/ManageUsers/ManageUsers";








const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut></LayOut>,
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
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/products',
                element: <Products></Products>
            },
            {
                path: 'products/:id',
                element: <ProductDetails></ProductDetails>
            }

        ]
    },

    // dashboard routes
    {
        path: 'dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path: 'myProfile',
                element:<MyProfile></MyProfile>
            },
            {
                path:'manageUsers',
                element:<ManageUsers></ManageUsers>
            }
        ]
    }

]
 );





export default router