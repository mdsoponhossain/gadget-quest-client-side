import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const SocialLogin = () => {
    const {  googleLoginHandle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const handleGoogleLogin = () => {
        googleLoginHandle()
            .then(async (result) => {
                console.log('google login is successful', result.user);
                // stored data in database ;
                const name = result.user.displayName
                const email = result.user.email
                const user = { name, email, role: 'user' }
                const res = await axiosPublic.post('/users', user)
                console.log(res.data, 'from the userdb')
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