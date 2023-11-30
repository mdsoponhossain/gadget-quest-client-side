import {  useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const {  googleLoginHandle } = useAuth();
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
                const user = { name, email, role: 'user',postInfo:[] }
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



    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn btn-outline">Continue with Google</button>
        </div>
    );
};

export default SocialLogin;