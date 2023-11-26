import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUserRole from "../../../Hooks/useUserRole";


const ManageUsers = () => {

    const axiosPublic = useAxiosPublic();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data;
        }
    })
    console.log('user from the user collection:', users)




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
                                <th>User Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => <tr key={index}>
                                    <th>
                                       {index +1}
                                    </th>
                                    <td>

                                        <div className="font-bold">{user?.name}</div>
                                    </td>
                                    <td>
                                        {user?.email}
                                    </td>
                                    <td> <label></label>
                                        <select defaultValue={user.role} className="h-12" >
                                            <option value="user">user</option>
                                            <option value="moderator">moderator</option>
                                            <option value="admin">admin</option>
                                        </select></td>
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