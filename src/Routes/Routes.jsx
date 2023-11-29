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
import AddProduct from "../Dashboard/Pages/AddProduct/AddProduct";
import ProductsReviewQueue from "../Dashboard/Pages/ProductsReviewQueue/ProductsReviewQueue";
import ReportedProducts from "../Dashboard/Pages/ReportedProducts/ReportedProducts";
import ManageCoupon from "../Dashboard/Pages/ManageCoupon/ManageCoupon";
import MyProducts from "../Dashboard/Pages/MyProducts/MyProducts";
import PrivateRoute from "../PrivateRoutes/PrivateRoute/PrivateRoute";
import UpdateProduct from "../Dashboard/Pages/UpdateProduct/UpdateProduct";








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
                element: <Products></Products>,
                loader:()=>fetch('http://localhost:5000/products-count')
            },
            {
                path: 'products/:id',
                element: <PrivateRoute> <ProductDetails></ProductDetails> </PrivateRoute>
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
                element:<PrivateRoute> <MyProfile></MyProfile> </PrivateRoute>
            },
            {
                path:'manageUsers',
                element:<PrivateRoute> <ManageUsers></ManageUsers> </PrivateRoute>
            },
            {
                path: 'addProduct',
                element:<PrivateRoute> <AddProduct></AddProduct> </PrivateRoute>
            },
            {
                path: 'updateProduct/:id',
                element:<UpdateProduct></UpdateProduct>,
                loader:({params})=>fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path:'reviewsQueue',
                element:<PrivateRoute> <ProductsReviewQueue></ProductsReviewQueue> </PrivateRoute>
            },
            {
                path: 'reportedProducts',
                element:<PrivateRoute> <ReportedProducts></ReportedProducts> </PrivateRoute>
            },
            {
                path: 'manageCoupon',
                element: <PrivateRoute> <ManageCoupon></ManageCoupon> </PrivateRoute>
            },
            {
                path: 'myproducts',
                element: <PrivateRoute> <MyProducts></MyProducts> </PrivateRoute>
            }
        ]
    }

]
 );





export default router