import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { imageUploade } from "../../hooks/imageUploade";
import { Helmet } from "react-helmet";


const Register = () => {
    const { setUser, createUser, updateUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [passError, setPassError] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const option = form.option.value;
        const password = form.password.value;
        const image = form.photo.files[0];

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setPassError(true);
            return;
        }

        let coinValue;

        if (option === 'worker') {
            coinValue = parseInt(10);
        }

        if (option === 'buyer') {
            coinValue = parseInt(50);
        }

        // setCoin(coinValue);

        createUser(email, password)
            .then(async (res) => {
                setPassError(false);
                setIsError(false);
                setUser(res.send);

                const photoBB = await imageUploade(image);

                updateUser({ displayName: name, photoURL: photoBB })
                    .then( async() => {

                        const userInfo = {
                            name: name,
                            email: email,
                            photo: photoBB,
                            role: option,
                            coin: coinValue,
                        }

                       axiosPublic.post('/users', userInfo)
                       .then(() => {})

                    })
                    .catch(() => {
                        
                    })
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);

            })
            .catch(err => {
                setIsError(true);
                setError(err.message);
            })
    }

    return (
        <div className="hero bg-base-100 min-h-screen">
            <Helmet>
                <title>MicroEarn | Register</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse py-5">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Regiter Now</h1>
                    <p className="py-6">
                       New here! Welcome. You are on right track..
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegister} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="name" name="name" placeholder="name" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="file" name="photo" className="file-input file-input-bordered w-full max-w-xs" required accept="image/*" />
                        </div>

                        <select name="option" className="select select-bordered w-full max-w-xs" required>
                            <option value=''>Your Role</option>
                            <option value='worker'>Worker</option>
                            <option value='buyer'>Buyer</option>
                        </select>



                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />

                        </div>

                        {passError && <p className="text-xs text-red-600">The password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.</p>}

                        <div className="form-control mt-6">
                            <button className="btn bg-[#007BFF]">Register</button>
                        </div>

                        <p className="text-sm">Already have an account? please <span><Link to='/login' className="text-blue-700">login</Link></span></p>

                        {
                            isError && <p className="text-xs text-red-600">{error}</p>
                        }

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;