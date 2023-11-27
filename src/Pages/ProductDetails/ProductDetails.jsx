import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { FaRegThumbsUp, FaRegThumbsDown, FaStar } from 'react-icons/fa';
import AddReview from "./AddReview";






const ProductDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();

    const { data: product = {},refetch } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${id}`)
            return res.data;
        }
    })
    console.log('single product details:', product);
    const { name, description, img, title, reviews = [], tags = [], upvote, downvote, _id } = product;


    // add reviews page function ;



    const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
    console.log(img_hosting_key);
    





    const handleSubmitForm = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        console.log('image hosting result data for review:', res.data.data.url);
        data.image = res.data.data.url
        if (res.data.success) {
            const res = await axiosPublic.patch(`/products/${_id}`, data)
            console.log('for review:', res.data)
            if(res.data.modifiedCount > 0){
                refetch();
            }
               
        }
    }

    const voteHandle = async (vote)=>{
        console.log('hello')
        const castVote = {vote:vote}
        const res = await axiosPublic.patch(`/products/vote/${_id}`,castVote)
        console.log('up vote cast:',res.data)
        if(res.data.modifiedCount > 0 ){
            refetch();
        }
    }

  


    return (
        <div className="md:mt-[103px]">
            <div className="card rounded-none my-5 h-fit p-3  md:h-[750px] bg-base-100 shadow-xl">
                <div className="h-[380px]  grid justify-center">
                    <img className="h-[370px]" src={img} alt={name} />
                </div>
                <div className="card-body p-0 md:p-0 ">
                    <h2 className="card-title text-4xl">
                        {title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                    <span className="text-lg  font-medium ">
                        <span>Reviews : {reviews.length}</span>
                        <FaStar className="text-orange-500 text-xl inline mb-[5px]" ></FaStar>
                    </span>
                    <span>
                       #{tags}
                    </span>
                    <p className="text-lg">{description}</p>
                    <div className="flex items-center  md:w-2/6 gap-2 md:gap-5">
                        <div className="flex-1 gap-2">
                            <div className="flex gap-2">
                                <button onClick={()=>voteHandle(1)}  className="btn btn-sm   md:text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                                <button onClick={()=>voteHandle(-1)} className="btn btn-sm md:text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>
                            </div>

                        </div>
                        <div className="flex-1">
                            <div className="flex justify-evenly  gap-2 ">
                                <button className=" btn btn-sm  md:btn inline">Add Review</button>
                                <button className="btn btn-sm  md:btn inline">Products</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* reviews sliders */}
            <div className="max-w-xl shadow-2xl my-20 bg-base-50 mx-auto">
                <AddReview handleSubmitForm={handleSubmitForm}></AddReview>
            </div>

        </div>
    );
};

export default ProductDetails;