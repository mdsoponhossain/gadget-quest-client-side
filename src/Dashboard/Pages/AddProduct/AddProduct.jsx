import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";


const AddProduct = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
    console.log(img_hosting_key);




    const handleSubmitForm = async (data) => {
        console.log(data)

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log('image hosting result data for review:', res.data.success);
        const img = res.data.data.url
            const date  = new Date();
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
            upvote:0,
            downvote:0,
            date:date
        }
        console.log(product)

        if(res.data.success){
            const res = axiosPublic.post('/users-post/product',product)
            console.log(res.data)
           
          }

        }

 
    return (
        <div>
            <form className="card-body bg-slate-100" onSubmit={handleSubmit(handleSubmitForm)}>
                <p className="text-center text-4xl my-6 ">Post For Reviews</p>
               
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
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;





// const imageFile = { image: data.image[0] }
//         const res = await axiosPublic.post(img_hosting_api, imageFile, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         })

//         console.log('image hosting result data for review:', res.data.data.url);
//         data.image = res.data.data.url
//         if (res.data.success) {
//             const res = await axiosPublic.patch(`/products/${_id}`, data)
//             console.log('for review:', res.data);
            
//             if (res.data.modifiedCount > 0) {
//                 refetch();
//             }

//         }