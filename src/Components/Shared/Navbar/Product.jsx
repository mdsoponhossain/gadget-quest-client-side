import { FaRegThumbsUp,FaRegThumbsDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Product = ({item}) => {
    const {img,category,name,tags,upvote,downvote,upload_time,_id} = item ;
    return (
        <div className="card card-compact  bg-base-100 shadow-xl ">
            <figure><img className="h-48 w-full" src={img} alt={name} /></figure>
            <div className="card-body">
                <Link to={`/products/${_id}`}><h2 className="card-title text-blue-600 underline">{name}</h2></Link>
                {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                {
                    tags.map((tag,inx)=><p key={inx}>#{tag}</p>)
                }
                
                <div className="card-actions justify-end">
                    <button className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                    <button className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>
                </div>
            </div>
        </div>
    );
};

export default Product;