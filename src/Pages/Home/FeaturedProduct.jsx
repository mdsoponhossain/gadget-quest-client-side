import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


const FeaturedProduct = ({ item, setReload, reload }) => {

    const { img, category, name, tags, upvote, downvote, upload_time, _id, voter } = item;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const userInfo = user?.email;


    const voteHandle = async (vote) => {
        if(!userInfo){
            return navigate('/login')
        }
        const castVote = { vote: vote, userInfo }
        const res = await axiosSecure.patch(`/featured-products/vote/${_id}`, castVote)
        // console.log('up vote cast:', res.data)
        if (res.data.modifiedCount > 0) {
            setReload(!reload)

        }
    }

    // console.log('the user have votted ?:', voter.includes(userInfo))


    return (
        <div className="card card-compact relative h-[400px]  bg-base-100 shadow-xl ">
            <figure><img className="h-48 w-full" src={img} alt={name} /></figure>
            {
                item?.date && <div className=' w-fit absolute   mb-10 grid justify-end'>
                    <p className='w-fit   mx-auto bg-[#09ad9b] bg-opacity-80 mt-2 text-white'>{item.date}</p>
                </div>
            }
            <div className="card-body">
                {
                    item?.id ? <Link to={`/products/${item?.id}`}><h2 className="card-title text-blue-600 underline">{name}</h2></Link>
                     : 
                     <h2 className="card-title text-slate-600 ">{name}</h2>

                }
                
                <p>#{tags}</p>
                <div className="card-actions justify-end">
                    {
                        voter.includes(userInfo) ? <>

                            <button disabled onClick={() => voteHandle(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                            <button disabled onClick={() => voteHandle(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>

                        </>

                            :

                            <>

                                <button onClick={() => voteHandle(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                                <button onClick={() => voteHandle(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>

                            </>
                    }



                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;