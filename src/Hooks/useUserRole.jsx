import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUserRole = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const {user,loading} = useAuth();

    const email = user?.email
    console.log('user email is from the userRole hook',email)
    const {data:userRole={}} = useQuery({
        queryKey:["user role",'user'],
        enabled: !loading ,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/singleUser/${email}`)
            return res.data
        }
    })

    console.log(userRole)

    return {userRole}
};

export default useUserRole;