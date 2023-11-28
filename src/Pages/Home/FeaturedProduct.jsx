import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';


const FeaturedProduct = ({ item, setReload,reload }) => {

    const { img, category, name, tags, upvote, downvote, upload_time, _id } = item;
    const axiosPublic = useAxiosPublic();


    const voteHandle = async (vote) => {
        const castVote = { vote: vote }
        const res = await axiosPublic.patch(`/featured-products/vote/${_id}`, castVote)
        console.log('up vote cast:', res.data)
        if (res.data.modifiedCount > 0) {
            setReload(!reload)
            
        }
    }


    return (
        <div className="card card-compact relative h-[400px]  bg-base-100 shadow-xl ">
            <figure><img className="h-48 w-full" src={img} alt={name} /></figure>
            {
                item?.date && <div className=' w-fit absolute   mb-10 grid justify-end'>
                    <p className='w-fit   mx-auto bg-[#09ad9b] bg-opacity-80 mt-2 text-white'>{item.date}</p>
                </div>
            }
            <div className="card-body">
                <Link to={`/products/${_id}`}><h2 className="card-title text-blue-600 underline">{name}</h2></Link>
                <p>#{tags}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => voteHandle(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                    <button onClick={() => voteHandle(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;