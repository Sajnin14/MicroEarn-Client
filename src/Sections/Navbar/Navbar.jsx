import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = () => {
    const { user, logout } = useAuth();

    const links = <div className="space-x-3 mr-2 font-semibold">
        <NavLink to='/'>Home</NavLink>
        {
            user?.email && <>
                <NavLink to='/dashboard'>Dashboard</NavLink>
                <NavLink>Coin</NavLink>
            </>
        }


        {/* <li><a>Item 3</a></li> */}
    </div>

    // const handleLogOut = () => {
    //     console.log('logout button clicked');
    //     logout()
    //     .then(() => {
    // 
    //     })
    //     .catch(error => console.log(error.code))
    // }
    return (
        <div className="bg-[#E6F2FF] sticky top-0 z-40 py-2">
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-2xl text-[#007BFF] inline font-semibold">Micro<span className="text-[#FFC107]">Earn</span></Link>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                        {
                            user.email ? <button className="font-semibold ml-2" onClick={() => logout()}>logout</button> 
                           : <div className="space-x-2 font-semibold">
                                <NavLink to='/login'>Login</NavLink>
                                <NavLink to='/register'>Register</NavLink>
                            </div>
                        }

                    </ul>


                </div>
                <div className="navbar-end">
                    {
                        user && user?.email ? <div className="relative flex flex-col items-center group mr-2">
                            <Link>
                                <img src={user.photoURL} className="w-10 h-10 rounded-full border-2 border-green-600" />
                                <p className="absolute w-2 h-2 bg-green-500 rounded-full top-0 right-2"></p>

                                <p className="absolute hidden group-hover:block top-9 right-1 font-semibold">{user.displayName}</p>
                            </Link>

                        </div> : <div><IoPersonCircleOutline className="text-4xl"></IoPersonCircleOutline></div>
                    }
                    <a className="btn bg-[#007BFF] text-white" href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Sajnin14" target="blank">Join As Developer</a>

                </div>
            </div>
        </div>
    );
};

export default Navbar;