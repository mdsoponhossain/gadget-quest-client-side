import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const PrivateRoute = ({children}) => {
   const {user,loading} = useAuth();
    const location = useLocation();
    console.log(location)
   if(loading){
    return ;
   }

   if(user){
    return children ;
   }

   return <Navigate to='/login' state={location.pathname}  ></Navigate>

};

export default PrivateRoute;