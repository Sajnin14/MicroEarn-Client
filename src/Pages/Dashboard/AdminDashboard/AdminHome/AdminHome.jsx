import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";

const AdminHome = () => {
    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
    }, [axiosSecure])

    console.log(users);

    const totalCoin = users.reduce((total, item) => total + item.coin, 0);
    // console.log(totalCoin);
    const totalWorkers = users.filter(users => users.role?.toLowerCase() === 'worker');
    const totalBuyers = users.filter(users => users.role?.toLowerCase() === 'buyer');

    return (
        <div>
            <SectionTitle heading={`Sir ,${userInfo.name}`} subHeading='--Please control the website--'></SectionTitle>

            <div className="m-10">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Total Worker</th>
                                <th>Total Buyers</th>
                                <th>Available Coins</th>
                                <th>Total Payments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr className="bg-base-200">
                                <td>{totalWorkers.length}</td>
                                <td>{totalBuyers.length}</td>
                                <td>{totalCoin}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;