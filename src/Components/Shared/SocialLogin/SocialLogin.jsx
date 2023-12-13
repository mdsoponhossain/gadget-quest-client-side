import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";


const SocialLogin = () => {
    const { googleLoginHandle, facebookLoginSetup,gitHubLoginSetup } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const handleGoogleLogin = () => {
        googleLoginHandle()
            .then(async (result) => {
                console.log('google login is successful', result.user);
                // stored data in database ;
                const name = result.user.displayName
                const email = result.user.email
                const user = { name, email, role: 'user', postInfo: [] }
                const res = await axiosPublic.post('/users', user)
                console.log(res.data, 'from the userdb')
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your login is successfully done",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(location?.state ? location.state : '/')
            })
            .catch(() => {
                console.log('google login failed')
            })

    }

    const handleFacebookLogin = () => {
        facebookLoginSetup()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const handleGitHublogin =()=>{
        gitHubLoginSetup()
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }



    return (
        <div>
            <div>
                <button onClick={handleGoogleLogin} className="mr-3 text-4xl text-green-500"><FaGoogle></FaGoogle></button>
                <button onClick={handleFacebookLogin} className="text-4xl text-blue-700"><FaFacebook></FaFacebook></button>
                <button onClick={handleGitHublogin} className=" ml-3 text-4xl text-black"><FaGithub></FaGithub></button>
            </div>
            <h1 className="text-2xl mt-5 font-medium text-center">Or</h1>
        </div>
    );
};

export default SocialLogin;