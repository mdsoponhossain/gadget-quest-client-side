import { FaRegThumbsUp, FaRegThumbsDown, FaBan } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const Product = ({ item,/* refetch */setLoading, loading }) => {
    const { img, category, name, tags, upvote, downvote, upload_time, _id, voter } = item;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const userInfo = user?.email;
   

    const voteHandle = async (vote) => {
        const castVote = { vote: vote, userInfo }
        const res = await axiosSecure.patch(`/products/vote/${_id}`, castVote)
        console.log('up vote cast:', res.data)
        if (res.data.modifiedCount > 0) {
            // refetch();
            setLoading(!loading)
        }
    }


    const addReport = async () => {

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
                <div className='flex justify-evenly items-center lg:gap-3'>
                    <div>
                        <button onClick={addReport} className='btn text-red-600'> <FaBan className='text-2xl'></FaBan>  </button>
                    </div>
                    <div className="card-actions justify-end">
                        {
                            voter.includes(userInfo) ? <>
                                <button disabled onClick={() => voteHandle(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                                <button disabled onClick={() => voteHandle(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>

                            </> :

                                <>
                                    <button  onClick={() => voteHandle(1)} className="btn text-2xl"><FaRegThumbsUp></FaRegThumbsUp>{upvote}</button>
                                    <button onClick={() => voteHandle(-1)} className="btn text-2xl"><FaRegThumbsDown></FaRegThumbsDown>{downvote}</button>

                                </>



                        }


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;