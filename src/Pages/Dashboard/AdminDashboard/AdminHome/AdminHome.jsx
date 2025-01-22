import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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


    const { data: withdrawals = [], refetch } = useQuery({
        queryKey: ['withdrawals'],
        queryFn: async () => {
            const task = await axiosSecure.get('/withdrawals');
            return (task.data);
        },
    })

    const handleStatus = (e, withdrawId, worker_email, withdrawal_coin)=> {
        e.preventDefault();
        const update = e.target.value;
        const value = {
            status : update
        }

        console.log(value);
        
        const withdrawCoin = parseInt(withdrawal_coin)
        console.log(withdrawCoin);
        Swal.fire({
            title: "Are you sure?",
            text: "user will get money",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, permit!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/withdrawals/${withdrawId}`, value)
                .then(res => {
                    if(res.data.modifiedCount){
                        refetch();
                        Swal.fire({
                            title: "Withdraw done!",
                            icon: "success"
                          });
                        if(value.status === 'approved'){
                            axiosSecure.patch(`/users/coin/${worker_email}`, {coinUpdate : withdrawCoin , status : 'decrease'})
                            .then(res => {
                                console.log(res.data);
                                if(res.data.modifiedCount){
                                    refetch();
                                }
                            })
                        }
                    }
                })
              
            }
          });
        
    }

    const totalCoin = users.reduce((total, item) => total + item.coin, 0);
    // console.log(totalCoin);
    const totalWorkers = users.filter(users => users.role?.toLowerCase() === 'worker');
    const totalBuyers = users.filter(users => users.role?.toLowerCase() === 'buyer');


    return (
        <div>
            <SectionTitle heading={`Sir ,${userInfo.name}`} subHeading='--Please control the website--'></SectionTitle>

            <div className="flex flex-col lg:flex-row items-center justify-between m-10 text-xl font-bold">
                <p>Total Workers: {totalWorkers.length}</p>
                <p>Total Buyers: {totalBuyers.length}</p>
                <p>Total Payment: {totalCoin}</p>
                <p>Total Payment: </p>
            </div>


            <div className="m-10">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>worker email</th>
                                <th>withdrawal coin</th>
                                <th>withdrawal amount</th>
                                <th>payment system</th>
                                <th>withdraw date</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {
                                withdrawals.map((withdraw, index) => <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{withdraw.worker_email}</td>
                                    <td>{withdraw.withdrawal_coin}</td>
                                    <td>{withdraw.withdrawal_amount}</td>
                                    <td>{withdraw.payment_system}</td>
                                    <td>{withdraw.withdraw_date}</td>
                                    <td>
                                        <select onChange={(e) => handleStatus(e, withdraw._id, withdraw.worker_email, withdraw.withdrawal_coin)} className="select select-bordered select-xs w-full max-w-xs">
                                            <option defaultValue={withdraw.status || 'pending'}>{withdraw.status}</option>
                                            <option value='approved'>approved</option>
                                        </select>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;