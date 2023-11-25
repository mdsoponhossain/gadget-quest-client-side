


import Banner from "../Banner";
import FeaturedProducts from "../FeaturedProducts";
import Footer from "../Footer";
import Parallex from "../Parallex";
import TrendingProducts from "../TrendingProducts";


const Home = () => {
    return (
        <div className="md:mt-[103px]">
            
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <Parallex></Parallex>
            <TrendingProducts></TrendingProducts>
            <Footer></Footer>
            
            
            
        </div>
    );
};

export default Home;