import { useEffect, useState } from "react";
import Product from "../../Components/Shared/Navbar/Product";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const FeaturedProducts = () => {

    const axiosPublic = useAxiosPublic();
    // const [featuredProducts, setFeaturedProducts] = useState([]);
    // useEffect(() => {
    //     fetch('./featureProducts.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             setFeaturedProducts(data)
    //         })
    // }, []);

    // console.log(featuredProducts)


    
   const {data: featuredProducts=[]} = useQuery({
    queryKey:['featuredProducts'],
    queryFn: async ()=>{
        const res = await axiosPublic.get('/featured-products')
        return res.data
    }

   })

   console.log('data from the featured products:',featuredProducts)
    






    return (
        <div className="mt-16">
            <h3 className="text-3xl mb-8 text-center font-bold">Feature Products</h3>
            <div className="grid md:grid-cols-2 md:gap-3 justify-center w-1/2 mx-auto">
                {
                    featuredProducts.map((item,index)=><Product key={index} item={item}></Product>)
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;