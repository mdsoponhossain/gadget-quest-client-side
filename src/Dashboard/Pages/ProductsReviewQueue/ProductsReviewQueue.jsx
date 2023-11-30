import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";




const ProductsReviewQueue = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: productsForAccepts = [], refetch } = useQuery({
        queryKey: ['productsForAccept'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user-post-products')
            return res.data
        }
    });

    console.log("the data :", productsForAccepts)
    const pending = productsForAccepts.filter(item => item.status === 'pending');
    const approved = productsForAccepts.filter(item => item.status === 'approved');
    const allProducts = [...pending, ...approved];
    // console.log('all the products is here:',allProducts)

    const approveTheProduct = async (id) => {
        const status = "approved"
        const res = await axiosSecure.patch(`/products-approved/${id}?status=${status}`)
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Approved the product",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }


    const rejectTheProduct = async (id) => {
        const res = await axiosSecure.delete(`/products-rejected/${id}`)
        console.log("deletion the rejected product:", res.data);
        if (res.data.result.deletedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Rejected the product",
                showConfirmButton: false,
                timer: 1500
              });

        }
    }

    // add-feature
    const addToFeatured = async (id) => {
        const product = allProducts.find((item) => item._id === id);
        console.log('will add to be featured items:', product)
        const res = await axiosSecure.post('/add-feature', product)
        // console.log('featured featured fetured:', res.data)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Added as featured product",
                showConfirmButton: false,
                timer: 1500
              });
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
                                <th></th>
                                <th></th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allProducts.map((item, index) => <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td><Link to={`/products/${item._id}`} ><button className="btn p-2 btn-sm  lg:mx-4 ">Details</button></Link></td>

                                    <td><button onClick={() => addToFeatured(item._id)} className=" btn p-2 btn-sm  lg:mx-4 " >Add</button></td>
                                    {
                                        item.status === 'pending' ? <td><button onClick={() => approveTheProduct(item._id)} className="btn p-2 btn-sm  lg:mx-4 " >Accept</button></td> : <td></td>
                                    }
                                    {
                                        item.status === 'pending' ? <td><button onClick={() => rejectTheProduct(item._id)} className="btn p-2 btn-sm  lg:mx-4 " >Reject</button></td> : <td></td>
                                    }
                                    <td><button className={item.status === 'pending' ? "bg-red-600 p-2 rounded text-white lg:mx-4 hover" : "bg-[#0cc4b0] p-2 btn-sm text-white lg:mx-4 hover:bg-[#228a7e]"} >{item.status}</button></td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default ProductsReviewQueue;