import { useEffect, useState } from "react";
import Product from "../../Components/Shared/Navbar/Product";


const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    useEffect(() => {
        fetch('./featureProducts.json')
            .then(res => res.json())
            .then(data => {
                setFeaturedProducts(data)
            })
    }, [])

    console.log(featuredProducts)
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