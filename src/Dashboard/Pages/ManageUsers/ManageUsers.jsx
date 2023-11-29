import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";




const ManageUsers = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {user:admin} = useAuth();
    const [userRole, setuserRole] = useState('')

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    console.log('user from the user collection:', users);

    const playRole = (e) => {
        console.log(e.target.value);
        setuserRole(e.target.value);
    }

    const playRoleHandle = (id) => {
        console.log('user id:', id, 'role:', userRole);
        axiosSecure.post(`/users-role/${id}`, { role: userRole })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                }
            })
    }




    return (
        <div>
            <h3 className="text-center text-xl font-bold ">Manage Users</h3>
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
                                <th className="text-xl font-bold" >Name</th>
                                <th className="text-xl font-bold" >Email</th>
                                <th className="text-xl font-bold" >Edit Role</th>
                                <th className="text-xl font-bold" >Apply Role</th>
                                <th className="text-xl font-bold" >User Role</th>
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
                                        {
                                            user?.email !== admin?.email && <form >
                                                <select onChange={playRole} defaultValue={user.role} className="h-12" >
                                                    <option value="user">user</option>
                                                    <option value="moderator">moderator</option>

                                                </select>
                                            </form>
                                        }

                                    </td>
                                    <td>
                                        <button onClick={() => playRoleHandle(user._id)} className="btn  btn-xs btn-secondary">Confirm</button>
                                    </td>
                                    <th>
                                        <span className=" text-md font-bold ">{user.role}</span>

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