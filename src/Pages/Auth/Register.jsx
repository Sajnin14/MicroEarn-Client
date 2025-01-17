
const Register = () => {

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const option = form.option.value;
        const password = form.password.value;
        
        console.log(name, email, photo, option, password);
    }

    return (
            <div className="hero bg-base-100 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse py-5">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Regiter Now</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
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
                                <input type="file" name="photo" className="file-input file-input-bordered w-full max-w-xs" />
                            </div>

                            <select name="option" className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Your Role</option>
                                <option>Worker</option>
                                <option>Buyer</option>
                            </select>



                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn bg-[#007BFF]">Register</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Register;