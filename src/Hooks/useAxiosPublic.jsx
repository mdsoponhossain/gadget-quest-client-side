import axios from "axios";

 const axiosPublic = axios.create({baseURL:"https://gadge-quest-server.vercel.app"})
const useAxiosPublic = () => {
   return axiosPublic ;
};

export default useAxiosPublic;