import { useEffect, useState } from "react";
import TrendingProduct from "../../Components/TrendingProduct";


const TrendingProducts = () => {


    const [trendingProducts, setTrendingProducts] = useState([]);
    useEffect(() => {
        fetch('./featureProducts.json')
            .then(res => res.json())
            .then(data => {
                setTrendingProducts(data)
            })
    }, [])

    console.log(trendingProducts)

    return (
        <div className="bg-slate-100 mb-10">
            <h3 className="mt-16 mb-8 text-3xl text-center font-bold">Trending Products</h3>

            <div className="grid md:grid-cols-2 lg:gap-3 p-2">
                {
                    trendingProducts.map((item, index) => <TrendingProduct key={index} item={item}></TrendingProduct>)
                }
            </div>
            <div className="card-actions justify-center">
                <button className="btn btn-primary">Show All</button>
            </div>

        </div>
    );
};

export default TrendingProducts;