import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';


const Product = ({ item ,/* refetch */setLoading ,loading}) => {
    const { img, category, name, tags, upvote, downvote, upload_time, _id } = item;
    const axiosPublic = useAxiosPublic();
    

    const voteHandle = async (vote) => {
        const castVote = { vote: vote }
        const res = await axiosPublic.patch(`/products/vote/${_id}`, castVote)
        console.log('up vote cast:', res.data)
        if (res.data.modifiedCount > 0) {
            // refetch();
            setLoading(!loading)
        }
    }


    return (
        <div className="card card-compact  bg-base-100 shadow-xl ">
            <figure><img className="h-48 w-full" src={img} alt={name} /></figure>
            <div className="card-body">
                <Link to={`/products/${_id}`}><h2 className="card-title text-blue-600 underline">{name}</h2></Link>
                <p>#{tags}</p>
                <div className="card-actions justify-end">
                    <button onClick={()=>voteHandle(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                    <button onClick={()=>voteHandle(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>
                </div>
            </div>
        </div>
    );
};

export default Product;