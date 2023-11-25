import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Product from "../../Components/Shared/Navbar/Product";


const Products = () => {
    const axiosPublic = useAxiosPublic();
 

    const {data: products=[]} = useQuery({
        queryKey:['products'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/products');
            return res.data
        }
        
    });
    console.log('products data:',products)
    return (
        <div className="md:mt-[200px]" >
            <div className="grid md:gap-2 lg:gap-3 md:grid-cols-2 lg:grid-cols-3">
                {products.map((item,index)=><Product key={index} item={item} ></Product>)}
            </div>
            
        </div>
    );
};

export default Products;