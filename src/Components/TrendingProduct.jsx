import { IoIosTrendingUp } from "react-icons/io";
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const TrendingProduct = ({ item, refetch }) => {

    const { img, category, name, tags, upvote, downvote, date, _id, voter } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const userInfo = user?.email;

    const handleVote = async (vote) => {
        if(!userInfo){
            navigate('/login')
        }
        const castVote = { vote: vote, userInfo };
        console.log(castVote)
        const res = await axiosSecure.patch(`/trending-products/vote/${_id}`, castVote)
        console.log('the data from the trending products:', res.data)
        if (res.data.modifiedCount > 0) {
            refetch();
        }

    }



    return (
        <div className="card h-60 card-side bg-base-100 shadow-xl">
            <div className="w-60">
                <figure><img className="h-60" src={img} alt={name} /></figure>
            </div>

            <div className="card-body ">
                <span className="card-title">{name}</span>
                <span className="text-3xl font-bold text-orange-300 "><IoIosTrendingUp></IoIosTrendingUp></span>
                <p>Click the button to watch on Jetflix app.</p>
                <div className="card-actions justify-end">
                    {
                        voter.includes(userInfo) ? <>

                            <button disabled onClick={() => handleVote(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                            <button disabled onClick={() => handleVote(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>

                        </>
                            :
                            <>

                                <button onClick={() => handleVote(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                                <button onClick={() => handleVote(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>

                            </>
                    }



                </div>
            </div>
        </div>
    );
};

export default TrendingProduct;