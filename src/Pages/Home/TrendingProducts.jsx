import { useEffect, useState } from "react";
import TrendingProduct from "../../Components/TrendingProduct";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const TrendingProducts = () => {


    // const [trendingProducts, setTrendingProducts] = useState([]);
    // useEffect(() => {
    //     fetch('./featureProducts.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             setTrendingProducts(data)
    //         })
    // }, [])

    // console.log(trendingProducts)
    const axiosPublic = useAxiosPublic();

    const { data: trendingProducts = [], refetch } = useQuery({
        queryKey: ['trendingProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trending-products')
            return res.data
        }

    })

    console.log('data from the trending products:', trendingProducts)




    return (
        <div className=" mb-10">
            <h3 className="mt-16 mb-8 text-3xl text-center font-bold">Trending Products</h3>

            <div className="grid md:grid-cols-2 lg:gap-3 p-2">
                {
                    trendingProducts.map((item, index) => <TrendingProduct key={index} refetch={refetch} item={item}></TrendingProduct>)
                }
            </div>
            <div className="card-actions justify-center my-5">
                <Link to='/products'>
                    <button className="btn bg-[#0cc4b0] hover:bg-[#35958a] text-white">Show All</button>
                </Link>
            </div>

        </div>
    );
};

export default TrendingProducts;