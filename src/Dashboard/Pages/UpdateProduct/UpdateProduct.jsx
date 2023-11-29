import { useLoaderData, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";


const UpdateProduct = () => {


    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const data = useLoaderData();
    // console.log('the id is for the update product info:', id, 'and the data is :', data.date);

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

        const dateString = data.date;
        const dateObject = new Date(dateString);
        const milliseconds = dateObject.getTime();
         console.log('date in miliseconds:', milliseconds, 'and Date:',data.date)

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log('image hosting result data for review:', res.data.success);
        const img = res.data.data.url
        const date = data.date;
        const product = {
            title: data.title,
            uploader: user.email,
            name: data.name,
            category: data.tags,
            img: img,
            description: data.description,
            tags: data.tags,
            status: 'pending',
            reviews: [],
            upvote: 0,
            downvote: 0,
            date: date,
            number: milliseconds
        }
        console.log(product)

        if (res.data.success) {
            const res = axiosPublic.patch(`/users-post/product/${id}`, product)
            console.log(res.data);
            // if(res.data.modifiedCount > 0){

            // }

        }

    }




    return (
        <div>
            <form className="card-body bg-slate-100" onSubmit={handleSubmit(handleSubmitForm)}>
                <p className="text-center text-4xl my-6 ">Update Posted product Info</p>
                <div className="grid justify-end">
                    <div className="w-3/4 mx-auto">
                        <label className="label">
                            <span className="label-text">Select Date</span>
                        </label>
                        <input  {...register("date", { required: true })} type="date" name="date" id="" required />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Title</span>
                    </label>
                    <input defaultValue={data.title} type="text" {...register("title", { required: true })} placeholder="Enter Product Title" className="input input-bordered" required />
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input defaultValue={data.name} type="text" {...register("name", { required: true })} placeholder="Enter Product Name" className="input input-bordered" required />
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
                        <select value={data.tags} className="h-12" {...register("tags", { required: true })}>
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
                    <textarea defaultValue={data.description} {...register("description", { required: true })} placeholder="Add Product Description" className="textarea textarea-bordered textarea-md w-full " ></textarea>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-[#0cc4b0] text-white hover:bg-[#1b776c]">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;