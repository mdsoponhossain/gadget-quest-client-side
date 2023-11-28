import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Product from "../../Components/Shared/Navbar/Product";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxDoubleArrowRight,RxDoubleArrowLeft } from 'react-icons/rx';
import useAxiosSecure from "../../Hooks/useAxiosSecure";



const Products = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    // const { totalProduct } = useLoaderData();
    const [totalProduct, setTotalProduct] = useState(0);


    console.log('productscount by loader', totalProduct);
    const [currentPage, setCurrentPage] = useState(0)

    console.log('the total product:', totalProduct)
    const itemsPerPage = 5;
    const totalPage = Math.ceil(parseFloat(totalProduct) / itemsPerPage)
    console.log('total page count :', totalPage)
    const pages = [...Array(totalPage).keys()];
    console.log("pages:", pages);

    


   


    // const { data: products = [], refetch } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/products?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
    //         return res.data
    //     }

    // });

    const [loading ,setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([]);
    const status = 'approved'


    useEffect(()=>{
        axiosSecure.get(`/products?status=${status}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&search=${search}`)
        .then(res=>{
            console.log(res.data)
            setProducts(res.data.cursor);
            setTotalProduct(res.data.totalCount)
        })
    },[currentPage,itemsPerPage,axiosSecure,loading,search]);

    console.log('set the all the all products:',products )



    const currentPageHandle = (number) => {
        setCurrentPage(number)
        // refetch();
        setLoading(!loading)
    }

    const previousBtnHandle = ()=>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
            // refetch();
            setLoading(!loading)
        }
    }

    const nextBtnHandle =()=>{
        if(currentPage < totalPage -1){
            setCurrentPage(currentPage + 1)
            // refetch();
            setLoading(!loading)
        }
    }
   
    const handleSearch =e=>{
        e.preventDefault();
        const searchText = e.target.search.value ;
        setSearch(searchText)
    }





    console.log('products data:', products)
    return (
        <div className="md:mt-[200px]" >

            <div className="bg-slate-300 my-7">

                <form onSubmit={handleSearch} className="w-1/2 mx-auto h-8">
                   <input name="search" type="text" />
                    <button className="btn btn-primary" >submit</button>
                </form>

            </div>



            <div className="grid md:gap-2 lg:gap-3 md:grid-cols-2 lg:grid-cols-4">
                {products.map((item, index) => <Product key={index} item={item} /* refetch={refetch} */ loading={loading} setLoading={setLoading} ></Product>)}
            </div>

            <div className="grid justify-center my-12">
                <div>

                    <button onClick={previousBtnHandle} className="btn bg-gray-200 mx-1 lg:mx-4"><RxDoubleArrowLeft></RxDoubleArrowLeft></button>


                    {
                        pages.map((page, index) => <button onClick={() => currentPageHandle(page)} key={index} className={currentPage === page ? "btn bg-[#0cc4b0] text-white lg:mx-4 hover:bg-[#09ad9b]" : "btn bg-gray-200 mx-1 lg:mx-4"} >{index + 1}</button>)
                    }

                    <button onClick={nextBtnHandle} className="btn bg-gray-200 mx-1 lg:mx-4"><RxDoubleArrowRight></RxDoubleArrowRight></button>
                </div>
            </div>

        </div>
    );
};

export default Products;