import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ReportedProducts = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: reportedProducts = [], refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/load-reported-products')
            return res.data
        }
    });

    console.log('all the reported products are:', reportedProducts)

    const handleDelete = async (id) =>{
        const res = await axiosSecure.delete(`/delete-reported-product/${id}`)
        console.log('the deletion status:',res.data)
        if(res.data.deletedCount > 0){
            refetch();
        }
    }



    return (
        <div className="overflow-y-auto">
            <div className="overflow-x-auto overflow-y-auto">
                <section>
                    <h3 className="text-3xl text-center font-bold my-3 uppercase">User request for post product</h3>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Products Name</th>
                                <th>Click to view</th>
                                <th>Make Featured Product</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reportedProducts.map((item, index) => <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td><Link to={`/products/${item._id}`} ><button className="btn p-2 btn-sm  lg:mx-4 ">Details</button></Link></td>

                                    <td><button onClick={()=>handleDelete(item._id)} className=" btn p-2 btn-sm  lg:mx-4 " >Delete</button></td>
                                   
                                    <td><span className={item.reported === true && "bg-red-600 p-2 rounded text-white lg:mx-4 hover"} >reported</span></td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default ReportedProducts;