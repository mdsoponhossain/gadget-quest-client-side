import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserRole from "../../../Hooks/useUserRole";
// import { useLoaderData, useParams } from "react-router-dom";


const AddProduct = () => {
    const {user} = useAuth();
    const {userRole} = useUserRole();
    const email = user.email ;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
  
    const length = userRole?.postInfo?.length
    const isVerified = userRole.status
     console.log(typeof length,isVerified);

   
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
    console.log(img_hosting_key);


   


    const handleSubmitForm = async (data) => {
         console.log(data.date)
        if(isVerified === undefined && length === 1 ){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You post limit is ended.Get premium to extend the limit!",
               
              });
              navigate('/dashboard/payment')
              return ;
        }

        const dateString = data.date;
        const dateObject = new Date(dateString);
        const milliseconds = dateObject.getTime();
        // console.log( milliseconds)

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log('image hosting result data for review:', res.data);

        const img = res.data.data.url
        const date  = data.date;
        const product = {
            title:data.title,
            uploader:user.email,
            name:data.name,
            category:data.tags,
            img:img,
            description:data.description,
            tags:data.tags,
            status:'pending',
            reviews:[],
            voter:[],
            reviewer:[],
            upvote:0,
            downvote:0,
            date:date,
            number:milliseconds
        }
        console.log(product)

        if(res.data.success){
            const res = await axiosSecure.post('/users-post/product',product)
            console.log(res.data.insertedId);
            if(res.data.insertedId){
                const user ={post:1}
                const updateUser = await axiosSecure.patch(`https://gadge-quest-server.vercel.app/update-user-paymentInfo/${email}`,user)
                console.log('Update user post info:',updateUser.data)


                navigate('/dashboard/myproducts')
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Successfully posted",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
           
          }

        }

 
    return (
        <div>
            <form className="card-body bg-slate-100" onSubmit={handleSubmit(handleSubmitForm)}>
                <p className="text-center text-4xl my-6 ">Post For Reviews</p>
                <div className="grid justify-end">
                    <div className="w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Select Date</span>
                    </label>
                        <input {...register("date", { required: true })} type="date" name="date" id="" required />
                    </div>
                </div>
               
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Title</span>
                    </label>
                    <input type="text" {...register("title", { required: true })} placeholder="Enter Product Title" className="input input-bordered" required />
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input type="text" {...register("name", { required: true })} placeholder="Enter Product Name" className="input input-bordered" required />
                </div>

                <div className="flex items-center border-4 gap-3 ">
                    <div className="form-control flex-1 ">
                        <label className="label">
                            <span className="label-text">Upload Product Photo</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input w-full max-w-xs" />
                    </div>
                    <div className="form-control flex-1 mt-3">
                        <label>Select Tag</label>
                        <select className="h-12" {...register("tags", { required: true })}>
                            <option value="camera">camera</option>
                            <option value="mobile">mobile</option>
                            <option value="pc">pc</option>
                            <option value="laptop">laptop</option>
                        </select>
                    </div>
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Description</span>
                    </label>
                    <textarea {...register("description", { required: true })} placeholder="Add Product Description" className="textarea textarea-bordered textarea-md w-full " ></textarea>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-[#0cc4b0] text-white hover:bg-[#1b776c]">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;

