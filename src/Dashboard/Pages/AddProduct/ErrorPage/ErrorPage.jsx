import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
            <div className="w-3/4 mx-auto">
                <img className="block mx-auto " src="https://i.ibb.co/NKqRw0W/Capture.jpg" alt="" />
            </div>
           <Link to={-1}> <button className="btn bg-blue-400 hover:bg-blue-500 text-white block mx-auto">Go Back</button></Link>
        </div>
    );
};

export default ErrorPage;