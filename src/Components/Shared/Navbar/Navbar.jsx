import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";



const Navbar = () => {

    const { user, handleSignOut } = useAuth();
    console.log('user from the navbar:', user)

    const handleLogout = () => {
        handleSignOut()
            .then(() => {
                console.log('logged out successfully completed')
            })
            .catch(() => {
                console.log('logged out failed')
            })
    }

    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/products' >Products</NavLink></li>
        {
            user ? '' :  <>
            <li><NavLink to='/login' >LogIn</NavLink></li>
            <li><NavLink to='/registration' >Registration</NavLink></li>
        </>
        }
    </>


    return (
        <div className="drawer   lg:max-w-7xl lg:mx-auto">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar lg:bg-gray-300 opacity-90 lg:max-w-7xl lg:mx-auto lg:fixed z-10 lg:h-[80px] ">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    {/* todo */}

                    <div className=" w-full">

                        <div className="flex justify-between w-3/5" >
                            <div className="flex-1 px-2 mx-2">GadgetQuest</div>
                            <div className="flex-none hidden lg:block">
                                <ul className="menu menu-horizontal">
                                    {/* Navbar menu content here */}
                                    {navItems}
                                </ul>
                            </div>
                        </div>


                        <div className="flex-1">
                            <div className="flex justify-center">

                                {
                                    user && <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn h-12 md:h-[60px]">
                                            <img className="h-12 w-12 rounded-3xl  md:h-[60px] md:w-[60px] md:rounded-[30px]" src={user?.photoURL} alt="" />
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li>{user?.displayName}</li>
                                            <li><Link to='/dashboard'><button>Dashboard</button></Link></li>
                                            <li><button onClick={handleLogout}>LogOut</button></li>
                                        </ul>
                                    </div>
                                }

                            </div>


                        </div>
                    </div>



                </div>
                {/* Page content here */}
                {/* Content */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    {navItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;