
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageCoupon = () => {
 const axiosPublic = useAxiosPublic()
 const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const handleSubmitForm = async (data) => {
        console.log(data)

        const res = await axiosSecure.post('/add-coupon',data)
        console.log('coupon status:', res.data)
        
        
    }



    return (
        <div>
            <form className="card-body max-w-md mx-auto md:mt-24 bg-slate-100" onSubmit={handleSubmit(handleSubmitForm)}>
                <p className="text-center text-4xl my-6 ">Add Coupon Code</p>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Coupon</span>
                    </label>
                    <input type="text" {...register("coupon", { required: true })} placeholder="Enter a coupon code within 8 characters" className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Offer</span>
                    </label>
                    <textarea {...register("offer", { required: true })} placeholder="Write Coupon offer" className="textarea textarea-bordered textarea-md w-full " ></textarea>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-[#0cc4b0] text-white hover:bg-[#1b776c]">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ManageCoupon;