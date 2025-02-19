
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import loginIng from '../../assets/images/2780702.jpg'


const Login = () => {
    const {loginUser, googleSignIn } = useAuth();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    // const location = useLocation();

    // const path = location.state?.from?.pathname || "/dashboard" ;

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then(() => {
                setError(false);
                navigate('/dashboard'); 
                // navigate(path, {replace: true});
            })
            .catch(error => {
                setError(true);
                setErrorMessage(error.code);
            })

    }

    const handleGoogle = () => {
        googleSignIn()
            .then(() => {
                // setUser(res.user);
                Swal.fire('successfully register with google' );
                navigate('/');
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet>
                <title>MicroEarn | Login</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />

                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-[#007BFF]">Login</button>
                        </div>

                        <p className="text-sm">new in MicroEarn? please <span><Link to='/register' className="text-blue-700">register</Link></span></p>

                        {
                            error && <p className="text-red-600 text-xs">{errorMessage}</p>
                        }

                       

                    </form>

                    <button onClick={handleGoogle} className="btn bg-base-300 mx-5 mb-7"><FcGoogle className="text-xl"></FcGoogle> Sign-in With Google</button>
                </div>

                <div>
                    {/* <h1 className="text-5xl font-bold">Login Now</h1>
                    <p className="py-6">
                        Login and earn money with fun
                    </p> */}
                    <img src={loginIng} className="w-2/3 mx-auto rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default Login;