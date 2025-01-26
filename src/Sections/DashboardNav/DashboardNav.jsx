import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const DashboardNav = () => {
    const [notifications, setNotifications] = useState([]);
    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        axiosSecure.get(`/notifications/${userInfo.email}`)
            .then(res => {
                console.log(res.data);
                setNotifications(res.data);
            })
    }, [axiosSecure, userInfo?.email])

    return (
        <div className="bg-[#E6F2FF] py-3 sticky z-40 top-0">
            <div className="navbar w-11/12 mx-auto">
                <div className="flex-1">
                    <Link to='/' className="btn btn-ghost text-2xl text-[#007BFF] inline font-semibold">Micro<span className="text-[#FFC107]">Earn</span></Link>
                </div>
                <div className="flex gap-4 items-center">
                    <div>
                        <p className="font-semibold">Coin: {userInfo.coin} </p>
                        <p className="text-lg">{userInfo.role}</p>
                    </div>

                    <div>
                        <img src={userInfo.photo} className="w-10 h-10 rounded-full border-2 border-[#FFC107]" />
                        <p>{userInfo.name}</p>
                    </div>

                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <button onClick={() => document.getElementById('openNotification').showModal()}> <FaBell className="text-4xl"></FaBell>
                                <p className="absolute w-4 h-4  rounded-full top-0 right-1 bg-yellow-500 font-bold">{notifications.length}</p></button>
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            
            <dialog id="openNotification" className="modal">
                <div className="modal-box">
                    {
                        notifications.map(notify => <div className="bg-base-100 border border-[#007BFF] p-5 rounded-lg m-4" key={notify._id}>
                            <p>{notify.message}</p>
                        </div>)
                    }
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default DashboardNav;