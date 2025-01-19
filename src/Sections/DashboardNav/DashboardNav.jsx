import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardNav = () => {
    const {currentUserInfo} = useAuth();
    console.log(currentUserInfo);
    // const axiosSecure = useAxiosSecure();
    // const [currentUserInfo, setCurrentUserInfo] = useState({});

    
    // useEffect(() => {
    //     axiosSecure.get(`/users/${user?.email}`)
    //     .then(res => {
    //       setCurrentUserInfo(res.data);
    //     })
    //   },[axiosSecure, user?.email, currentUserInfo])
      
    return (
        <div className="bg-[#E6F2FF] py-3 sticky z-40 top-0">
            <div className="navbar w-11/12 mx-auto">
                <div className="flex-1">
                    <Link to='/' className="btn btn-ghost text-2xl text-[#007BFF] inline font-semibold">Micro<span className="text-[#FFC107]">Earn</span></Link>
                </div>
                <div className="flex gap-4 items-center">
                    <div>
                        <p className="font-semibold">Coin: {currentUserInfo.coin} </p>
                        <p className="text-lg">{currentUserInfo.role}</p>
                    </div>

                    <div>
                        <img src={currentUserInfo.photo} className="w-10 h-10 rounded-full border-2 border-[#FFC107]" />
                        <p>{currentUserInfo.name}</p>
                    </div>

                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <FaBell className="text-3xl"></FaBell>
                            <p className="absolute w-2 h-2 bg-[#FFC107] rounded-full top-0 right-1"></p>
                            {/* <span className="badge badge-sm indicator-item rounded-full"></span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;