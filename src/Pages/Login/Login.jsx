

const Login = () => {
    return (
        <div className="card font-serif  shrink-0 w-full max-w-sm mx-auto mt-5 md:mt-40 lg:mt-60  shadow-2xl bg-base-100">
            <form className="card-body">
                <p className="text-center text-4xl my-6 ">Login Form</p>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;