import { IoIosTrendingUp } from "react-icons/io";
import { FaRegThumbsUp,FaRegThumbsDown } from 'react-icons/fa';

const TrendingProduct = ({ item }) => {

    const { img, category, name, tags, upvote, downvote, upload_time } = item;
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
                    <button className="btn btn-primary"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                    <button className="btn btn-primary"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>
                </div>
            </div>
        </div>
    );
};

export default TrendingProduct;