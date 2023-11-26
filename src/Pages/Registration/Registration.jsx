import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Registration = () => {

    const { handleSignUp, updateUserProfile, googleLoginHandle } = useAuth()
    const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
    console.log(img_hosting_key);
    const axiosPublic = useAxiosPublic();

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
                        .then( async () => {
                            console.log('user profile is updated successfully');
                            // stored data in database ;
                            const user= {name,email,role:'user'}
                            const res = await axiosPublic.post('/users',user) 
                            console.log(res.data,'from the userdb')
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


    const handleGoogleLogin = () => {
        googleLoginHandle()
            .then(() => {
                console.log('google login is successfull');
            })
            .catch(() => {
                console.log('google login failed')
            })

    }






    return (
        <div className="card font-serif  shrink-0 w-full max-w-lg mx-auto mt-5 md:mt-40 lg:mt-60  shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(handleFormSubmit)}>
                <p className="text-center text-4xl my-6 ">Registration Form</p>
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
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>
            <button onClick={handleGoogleLogin} className="btn btn-primary">Continue with Google</button>
        </div>
    );
};

export default Registration;