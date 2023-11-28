import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const MyProducts = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const email = user.email;

    const { data: myProducts = [] } = useQuery({
        queryKey: ['myProducts'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myProducts/${email}`)
            return res.data
        }
    })

    console.log('my added products are :', myProducts)


    return (
        <div>
            <h3 className="text-3xl">This is my products page</h3>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>View Details</th>
                                <th>Update</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myProducts.map((item,index)=><tr key={index} >
                                <th>1</th>
                                <td>{item.name}</td>
                                <td><Link to={`/products/${item._id}`} >Details</Link></td>
                                <td>
                                    <button className="btn">Update</button>
                                </td>
                                <td><span className={item.status === 'pending' ?  "bg-red-600 p-2 rounded text-white lg:mx-4 hover" : "bg-[#0cc4b0] p-2 btn-sm text-white lg:mx-4 hover:bg-[#228a7e]" } >{item.status}</span></td>
                            </tr>  )
                            }
                            
                            
                           
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyProducts;