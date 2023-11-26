import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";



const ManageUsers = () => {

    const axiosPublic = useAxiosPublic();
    const [userRole, setuserRole] = useState('')

    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data;
        }
    })
    console.log('user from the user collection:', users);

    const playRole =(e)=>{
        console.log(e.target.value);
        setuserRole(e.target.value);
    }

    const playRoleHandle =(id)=>{
        console.log('user id:',id,'role:',userRole);
        axiosPublic.post(`/users-role/${id}`,{role:userRole})
         .then(res=>{
             console.log(res.data)
             if(res.data.modifiedCount){
                refetch()
             }
         })
     }




    return (
        <div>
            <h3 className="text-center text-xl font-bold">Manage Users</h3>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        #
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Edit Role</th>
                                <th>Apply Role</th>
                                <th>User Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => <tr key={index}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>

                                        <div className="font-bold">{user?.name}</div>
                                    </td>
                                    <td>
                                        {user?.email}
                                    </td>
                                    <td> <label></label>
                                        <form >
                                            <select onChange={playRole}  defaultValue={user.role} className="h-12" >
                                                <option value="user">user</option>
                                                <option value="moderator">moderator</option>
                                                
                                            </select>
                                        </form>
                                    </td>
                                    <td>
                                    <button onClick={()=>playRoleHandle(user._id)} className="btn btn-ghost btn-xs">Confirm</button>
                                    </td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">{user.role}</button>

                                    </th>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageUsers;

//{...register("rating", { required: true })}