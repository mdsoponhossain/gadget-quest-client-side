import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useProductCount = () => {
    const axiosPublic = useAxiosPublic();
    const {data: productCount={}} = useQuery({
        queryKey:['productCount'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/products-count')
            return res.data ;
        }
    })

    return productCount
};

export default useProductCount;