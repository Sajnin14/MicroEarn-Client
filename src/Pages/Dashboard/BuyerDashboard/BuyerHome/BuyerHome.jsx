import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import Swal from "sweetalert2";


const BuyerHome = () => {
    const [userInfo, refetch] = useUser();
    const axiosSecure = useAxiosSecure();

    const { data: tasks = [] } = useQuery({
        queryKey: ['tasks', userInfo?.email],
        queryFn: async () => {
            const task = await axiosSecure.get(`/tasks/${userInfo.email}`);
            return (task.data);
        },
    })

    const { data: submissions = [] } = useQuery({
        queryKey: ['users', userInfo?.email],
        queryFn: async () => {
            const submit = await axiosSecure.get(`/submitTask/${userInfo.email}`)
            return (submit.data);
        }
    })

    const totalRequirement = tasks.reduce((total, item) => total + item.neededWorkers, 0)
    const totalPayment = tasks.reduce((total, item) => total + item.totalSpentCoin, 0)
    console.log(totalPayment);

    const handleStatus = async (e, id, payable_amount, email, neededWorkers, task_id) => {
        e.preventDefault();
        const value = e.target.value;
        const data = {
            status: value
        }
        console.log(payable_amount, neededWorkers, email);
        const needed = neededWorkers + 1;
        const total = needed * payable_amount;
        const updateInfo = {
            neededWorkers: needed,
            totalSpentCoin: total
        }

        console.log(updateInfo);

        if (userInfo?.email) {
            axiosSecure.patch(`/submitTask/${id}`, data)
                .then(async (res) => {
                   
                    if (res.data.modifiedCount && data.status === 'approved') {

                        axiosSecure.patch(`/users/coin/${email}`, { coinUpdate: payable_amount, status: 'increase' })
                            .then(res => {
                                if (res.data.modifiedCount) {
                                    refetch();
                                    console.log(res.data);
                                }
                            })
                    }


                    if (res.data.modifiedCount && data.status === 'rejected') {
                        console.log('rejected')
                        const res = await axiosSecure.patch(`/tasks/email/${task_id}`, updateInfo)
                        if (res.data.modifiedCount) {
                            refetch();
                        }
    
                    }


                })


               
        }

    }

    return (
        <div>
            <SectionTitle heading={userInfo.name} subHeading='manage your tasks from here'></SectionTitle>

            <div className="m-10">
                <div className="flex flex-col lg:flex-row items-center justify-between my-10 text-xl font-bold">
                    <p>Total Tasks Added: {tasks.length}</p>
                    <p>Total Requirements: {totalRequirement}</p>
                    <p>Total Payment: {totalPayment} coin</p>
                </div>

                <div className="overflow-x-auto m-14 mt-0">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Worker Name</th>
                                <th>Payable Amount</th>
                                <th>View Submission</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                submissions.map((submit, idx) => <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{submit.task_title}</td>
                                    <td>{submit.worker_name}</td>
                                    <td>{submit.payable_amount
                                    }</td>
                                    <td><button className="btn">see details</button></td>
                                    <td>
                                        <select onChange={(e) => handleStatus(e, submit._id, submit.payable_amount, submit.worker_email, submit.neededWorkers, submit.task_id, submit.totalSpentCoin
                                        )} className="select select-bordered select-xs w-full max-w-xs">
                                            <option defaultValue={submit.status || 'pending'}>{submit.status}</option>
                                            <option value='approved'>approved</option>
                                            <option value='rejected'>rejected</option>
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

export default BuyerHome;