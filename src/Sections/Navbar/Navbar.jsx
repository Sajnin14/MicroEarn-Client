import { NavLink } from "react-router-dom";

const Navbar = () => {
    const links = <div className="space-x-3 font-semibold">
        <NavLink to='/auth/login'>Login</NavLink>
        <NavLink to='/auth/register'>Register</NavLink>
        {/* <li><a>Item 3</a></li> */}
    </div>
    return (
        <div className="bg-[#E6F2FF] sticky top-0 z-40">
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
                    <a className="btn btn-ghost text-2xl text-[#007BFF] inline font-semibold">Micro<span className="text-[#FFC107]">Earn</span></a>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn bg-[#007BFF] text-white" href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Sajnin14" target="blank">Join As Developer</a>

                </div>
            </div>
        </div>
    );
};

export default Navbar;