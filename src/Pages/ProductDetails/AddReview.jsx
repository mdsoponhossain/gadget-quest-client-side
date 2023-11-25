import { useForm } from "react-hook-form";


const AddReview = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const handleSubmitForm = (data) => {
        console.log(data)
        const img = data.img[0];
        console.log(img)
    }

    


    return (
        <div>
            <form className="card-body bg-slate-100" onSubmit={handleSubmit(handleSubmitForm)}>
                <p className="text-center text-4xl my-6 ">Add a review</p>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name",{ required: true})} placeholder="Enter Your Name" className="input input-bordered" required/>
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email",{ required: true})} placeholder="Enter Your Email" className="input input-bordered" required />
                </div>


                <div className="flex items-center border-4 gap-3 ">
                    <div className="form-control flex-1 ">
                        <label className="label">
                            <span className="label-text">Your Photo</span>
                        </label>
                        <input type="file" {...register("img",{ required: true})} className="file-input w-full max-w-xs" />
                    </div>
                    <div className="form-control flex-1 mt-3">
                        <label>Rating Selection</label>
                        <select className="h-12" {...register("rating",{ required: true})}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Comment</span>
                    </label>
                    <textarea {...register("comment",{ required: true})} placeholder="Add Your Comments" className="textarea textarea-bordered textarea-md w-full " ></textarea>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddReview;