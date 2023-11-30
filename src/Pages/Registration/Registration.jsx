import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/Shared/SocialLogin/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Registration = () => {

    const { handleSignUp, updateUserProfile } = useAuth()
    const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
    console.log(img_hosting_key);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleFormSubmit = async (data) => {
        console.log(data);
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        console.log('image hosting result data:', res.data.data.url)
        if (res.data.success) {
            const userInfo = {
                displayName: name,
                photoURL: res.data.data.url
            }
            handleSignUp(email, password)
                .then(result => {
                    console.log(result.user);
                    //user is created successfully
                    updateUserProfile(userInfo)
                        .then(async () => {
                            console.log('user profile is updated successfully');
                            // stored data in database ;
                            const user = { name, email, role: 'user',postInfo:[] }
                            const res = await axiosPublic.post('/users', user)
                            console.log(res.data, 'from the userdb')
                            if(res.data.insertedId){
                                Swal.fire({
                                    position: "top-center",
                                    icon: "success",
                                    title: "Your registration  is successfully done",
                                    showConfirmButton: false,
                                    timer: 1500
                                  });
                            }
                            navigate('/')
                        })
                        .catch(() => {
                            console.log('user profile updating failed')
                        })
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

    }







    return (
        <div className="card font-serif  shrink-0 w-full max-w-lg mx-auto mt-5 md:mt-40 lg:mt-60  shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(handleFormSubmit)}>
                <p className="text-center text-4xl my-6 ">Registration Form</p>
                <div className="grid justify-center">
                    <SocialLogin></SocialLogin>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: true })} placeholder="Enter Your Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true })} placeholder="Enter Your Email" className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", { required: true })} placeholder="Type Your Password" className="input input-bordered" required />

                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Select Your image</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full max-w-xs" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-[#0cc4b0] text-white hover:bg-[#114c45]">Register</button>
                </div>
                <p>Have Account? please<Link to='/login' className="text-blue-600 ml-4 text-lg font-bold underline">Login</Link></p>
            </form>

        </div>
    );
};

export default Registration;