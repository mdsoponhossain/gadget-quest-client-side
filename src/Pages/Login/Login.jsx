import { useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../Components/Shared/SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";


const Login = () => {

    const { handleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        handleSignIn(email, password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }


    return (
        <div className="card font-serif  shrink-0 w-full max-w-sm mx-auto mt-5 md:mt-40 lg:mt-60  shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
                <p className="text-center text-4xl my-6 ">Login Form</p>
                <div className="grid justify-center">
                    <SocialLogin></SocialLogin>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-[#0cc4b0] text-white hover:bg-[#114c45]">Login</button>
                </div>
            </form>
            
        </div>
    );
};

export default Login;