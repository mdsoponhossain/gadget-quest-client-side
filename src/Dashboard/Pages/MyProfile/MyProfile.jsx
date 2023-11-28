import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";


const MyProfile = () => {


    const {user} = useAuth()
    console.log(user)
    const {userRole} = useUserRole();


    return (


        <div className="card w-full md:w-3/4 md:mx-auto h-full bg-base-100 shadow-xl">
            <figure><img className=" mt-3 md:mt-10 h-[150px] w-[150px] rounded-[75px] md:h-[200px] md:w-[200px] md:rounded-[100px] lg:h-[300px] lg:w-[300px] lg:rounded-[150px]" src={user?.photoURL} alt={user?.displayName} /></figure>
            <div className=" text-center my-5">
                <h2 className="card-title text-4xl font-bold justify-center">
                    {user?.displayName}
                    <div className="badge badge-secondary">{userRole.role}</div>
                </h2>
                <p className="text-xl my-1">{user?.email}</p>
                <span className="text-xl">Status: verified</span>
                <div className="card-actions justify-center">
                    <button className="btn bg-[#0cc4b0] text-white hover:bg-[#1b776c]">Subscribe</button>
                </div>
            </div>
        </div>


    );
};

export default MyProfile;