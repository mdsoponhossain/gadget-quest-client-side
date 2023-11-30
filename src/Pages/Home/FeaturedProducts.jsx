import { useEffect, useState } from "react";
import Product from "../../Components/Shared/Navbar/Product";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import FeaturedProduct from "./FeaturedProduct";


const FeaturedProducts = () => {

    const axiosPublic = useAxiosPublic();
    const [sort, setSort] = useState(1);
    const [reload, setReload] = useState(false)

    const handleSorting = (e) => {
        // console.log(e.target.value)
        setSort(e.target.value)
    }


    const [featuredProducts, setFeaturedProducts] = useState([]);
    useEffect(() => {
        axiosPublic.get(`/featured-products?sortField=number&sortOrder=${sort}`)
            .then(res => {
                // console.log(res.data);
                setFeaturedProducts(res.data)
            })
    }, [sort,axiosPublic,reload])

    // console.log(featuredProducts)



    // const { data: featuredProducts = [], refetch } = useQuery({
    //     queryKey: ['featuredProducts'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/featured-products')
    //         return res.data
    //     }

    // })

    // console.log('data from the featured products:', featuredProducts)






    return (
        <div className="mt-16">
            <h3 className="text-3xl mb-8 text-center font-bold">Feature Products</h3>
            <div className="h-10 w-full">
                <select onChange={handleSorting} className="bg-[#0cc4b0] text-white" >
                    <option value="1">Asending sort by date</option>
                    <option value="-1">desending sort by date</option>
                </select>
            </div>
            <div className="grid md:grid-cols-2 md:gap-3 justify-center w-1/2 mx-auto">
                {
                    featuredProducts.map((item, index) => <FeaturedProduct key={index} item={item} reload={reload} setReload={setReload} ></FeaturedProduct>)
                }
            </div>

        </div>
    );
};

export default FeaturedProducts;