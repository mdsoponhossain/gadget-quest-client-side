import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { FaRegThumbsUp, FaRegThumbsDown, FaStar, FaBan } from 'react-icons/fa';
import AddReview from "./AddReview";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Reviews from "../Reviews/Reviews";






const ProductDetails = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { user, loading } = useAuth();
    const userInfo = user?.email;

    const { data: product = {}, refetch } = useQuery({
        queryKey: ['product'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${id}`)
            return res.data;
        }
    })
    const reviewData = product.reviews
    console.log('single product details:', product.reviews);
    const reviewerContainer = product.reviewer
    const { name, description, img, title, reviews = [], tags = [], upvote, downvote, _id, voter } = product;
    console.log('check the user has liked or voted', voter?.includes(userInfo))


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
        data.image = res.data.data.url;

        if (res.data.success) {
            console.log('for review:', data)
            const res = await axiosSecure.patch(`/products/${_id}`, data)
            console.log('for review:', res.data)
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your review submitted",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }

        }
    }

    const voteHandle = async (vote) => {
        console.log('hello')
        const castVote = { vote: vote, userInfo }
        const res = await axiosSecure.patch(`/products/vote/${_id}`, castVote)
        console.log('up vote cast:', res.data)
        if (res.data.modifiedCount > 0) {
            refetch();
        }
    }

    const addReport =  () => {

        Swal.fire({
            title: "Are you sure to report ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                console.log(_id)
                const reporterInfo = { name: user?.displayName, email: user?.email };
                console.log('reported user:', reporterInfo)
                  axiosSecure.patch(`/products/report/${_id}`, reporterInfo)
                  .then(res=>{
                      console.log('reported completed:', res.data) // modifiedCount
                      if(res.data.modifiedCount > 0){
                        Swal.fire({
                            title: "Reported !",
                            text: "Reported done",
                            icon: "success"
                          });
                      }

                  })
            }
          });


        
        
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
                                {

                                    product?.uploader !== userInfo ? <> {
                                        voter?.includes(userInfo) ? <>
                                            <button disabled onClick={() => voteHandle(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                                            <button disabled onClick={() => voteHandle(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>

                                        </> :

                                            <>

                                                <button onClick={() => voteHandle(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                                                <button onClick={() => voteHandle(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>

                                            </>



                                    }
                                    </>
                                        :

                                        <>
                                            <button disabled onClick={() => voteHandle(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                                            <button disabled onClick={() => voteHandle(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>

                                        </>

                                }


                            </div>

                        </div>
                        <div className="flex-1">
                            <div className="flex justify-evenly  gap-2 ">
                                <button onClick={addReport} className='btn text-red-600'> <FaBan className='text-2xl'></FaBan>  </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* reviews sliders */}
            <p className="text-3xl text-center text-slate-800 font-bold my-6">User Feedback</p>
            <div className="max-w-7xl bg-slate-50 w-fit grid md:grid-cols-3 gap-1 ">
                {
                    reviewData?.map((review, index)=> <Reviews key={index} review={review} ></Reviews> )
                }
            </div>
            <div className=" max-w-7xl  shadow-2xl h-[800px] my-20 bg-base-300 border-4  mx-auto">
                {
                    product?.uploader !== userInfo && <AddReview userInfo={userInfo} reviewerContainer={reviewerContainer} handleSubmitForm={handleSubmitForm}></AddReview>
                }

            </div>

        </div>
    );
};

export default ProductDetails;