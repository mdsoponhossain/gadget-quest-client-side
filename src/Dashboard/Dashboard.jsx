import { NavLink } from "react-router-dom";


const Dashboard = () => {


    const userRole = 'admin'
    const dashboardMenu = <>

        {
            userRole === 'user' ? <>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                <li><NavLink to='/dashboard/myProducts'>My Products</NavLink></li>
                <li><NavLink to='/addProduct'>Add Product</NavLink></li>
                <li><NavLink to='/'>Go Home</NavLink></li>

            </> : ''
        }


        {
            userRole === 'moderator' &&  <>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                <li><NavLink to='/reviewsQueue'>Products Reviews Queue</NavLink></li>
                <li><NavLink to='/reportedContent'>Reported Content</NavLink></li>
                <li><NavLink to='/'>Go Home</NavLink></li>

            </>
        }


        {
            userRole === 'admin' && <>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                <li><NavLink to='/manageUsers'>Manage Users</NavLink></li>
                <li><NavLink to='/manageCoupons'>Manage Coupons</NavLink></li>
                <li><NavLink to='/'>Go Home</NavLink></li>

            </>
        }

    </>








    return (
        <div className="max-w-7xl mx-auto border-4 ">
            <h3 className="text-3xl text-center font-bold">This is the dashboard page</h3>
            <div className="flex w-full gap-3 md:gap-5 p-2">
                <div className="border-4 w-3/12 min-h-screen">
                    <ul className="menu">
                        {dashboardMenu}
                    </ul>

                </div>

                <div className="border-4 flex-1 h-[800px]">

                </div>
            </div>

        </div>
    );
};

export default Dashboard;