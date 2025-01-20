import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import useUser from "../../../../hooks/useUser";

const PaymentHistory = () => {

    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();
    const [history, setHistory] = useState();

    useEffect(() => {
        axiosSecure.get(`/paymentsHistory/${userInfo.email}`)
            .then(res => {
                console.log(res.data);
                setHistory(res.data);
            })
    }, [axiosSecure, userInfo])

    return (
        <div>
            <SectionTitle heading='Payment History' subHeading='--see your payments info--'></SectionTitle>

            <div className="overflow-x-auto p-14">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Coin</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {history.map((his, idx) => <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{his.price} $</td>
                            <td>{his.buyCoin}</td>
                            <td>{his.date}</td>
                        </tr>)}
                        
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;