import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../assets/sliderImage/sliderImage-1.jpg'
import image2 from '../../assets/sliderImage/sliderImage-2.jpg'
import image3 from '../../assets/sliderImage/sliderImage-3.jpg'
import image4 from '../../assets/sliderImage/sliderImage-04.jpg'
import image5 from '../../assets/sliderImage/sliderImage-05.jpeg'


const Banner = () => {
    return (
        <div>
            <Carousel className="h-[700px]" >
                <div className="h-[600px]" >
                    <h3 className="text-white text-5xl font-bold  w-3/4 mx-auto fixed ml-[12%]  bg-slate-700 opacity-50 p-10  mt-24">
                        Your Platform for the Next Big Tech Breakthroughs!
                    </h3>
                    <img className="h-full" src={image1} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>

                <div className="h-[600px]">
                    <h3 className="text-white text-5xl font-bold  w-3/4 mx-auto fixed ml-[12%] bg-slate-700 opacity-70 p-10 mt-24">
                        Your Platform for the Next Big Tech Breakthroughs!
                    </h3>
                    <img className="h-full" src={image2} />

                </div>

                <div className="h-[600px]">
                    <h3 className="text-white text-5xl font-bold  w-3/4 mx-auto fixed ml-[12%] bg-slate-700 opacity-50 p-10 mt-24">
                        Your Platform for the Next Big Tech Breakthroughs!
                    </h3>
                    <img className="h-full" src={image3} />
                </div>
                <div className="h-[600px]">
                    <h3 className="text-white text-5xl font-bold  w-3/4 mx-auto fixed ml-[12%] bg-slate-700 opacity-70 p-10 mt-24">
                        Your Platform for the Next Big Tech Breakthroughs!
                    </h3>
                    <img className="h-full" src={image4} />
                </div>
                <div className="h-[600px]">
                    <h3 className="text-white text-5xl font-bold  w-3/4 mx-auto fixed ml-[12%] bg-slate-700 opacity-70 p-10 mt-24">
                        Your Platform for the Next Big Tech Breakthroughs!
                    </h3>
                    <img className="h-full" src={image5} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;