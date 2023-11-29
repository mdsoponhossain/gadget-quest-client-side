import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({ baseURL: "http://localhost:5000" })
const useAxiosSecure = () => {
    const { handleSignOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(function (config) {

        const token = localStorage.getItem('access-token');
        // console.log('the token from the localStorage:', token);

        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
        function (error) {
            return Promise.reject(error)
        }

    )

    // interceptor for 403 and 404 ;
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    },
        async (error) => {
            const status = error.response.status;
            console.log('the error status code is:', status);
            if (status === 401 || status === 403) {
                await handleSignOut();
                navigate('/login')
            }

            return Promise.reject(error)
        }


    )



    return axiosSecure;
};

export default useAxiosSecure;