import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../../Hooks/useUserRole";


const Dashboard = () => {
   
    const {userRole} = useUserRole();
    console.log('user role is:',userRole)
   
    const dashboardMenu = <>

        {
            userRole?.role === 'user' ? <>
                
                <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                <li><NavLink to='/dashboard/myproducts'>My Products</NavLink></li>
                <li><NavLink to='/dashboard/addProduct'>Add Product</NavLink></li>
                <li><NavLink to='/'>Go Home</NavLink></li>

            </> : ''
        }


        {
            userRole?.role === 'moderator' &&  <>
                
                <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                <li><NavLink to='/dashboard/reviewsQueue'>Products Reviews Queue</NavLink></li>
                <li><NavLink to='/dashboard/reportedProducts'>Reported Content</NavLink></li>
                <li><NavLink to='/'>Go Home</NavLink></li>

            </>
        }


        {
            userRole?.role === 'admin' && <>
                
                <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                <li><NavLink to='/dashboard/manageUsers'>Manage Users</NavLink></li>
                <li><NavLink to='/dashboard/manageCoupon'>Manage Coupons</NavLink></li>
                <li><NavLink to='/'>Go Home</NavLink></li>

            </>
        }

    </>








    return (
        <div className="max-w-7xl mx-auto border-4 ">
            <h3 className="text-3xl bg-green-300 p-2 mx-2 text-center md:text-5xl font-bold">Dashboard</h3>
            <div className="flex w-full gap-3 md:gap-5 p-2">
                <div className="border-4 w-3/12 min-h-screen bg-green-300">
                    <ul className="menu">
                        {dashboardMenu}
                    </ul>

                </div>

                <div className="border-4 flex-1 h-screen overflow-y-auto bg-[#E6E6AC]">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;