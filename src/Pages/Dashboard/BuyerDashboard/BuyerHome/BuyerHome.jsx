import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";




const BuyerHome = () => {

    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    console.log(location.pathname);

    const { data: tasks = [], refetch } = useQuery({
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



    const handleStatus = async (e, id, payable_amount, email, workersCount, task_id, title) => {
        e.preventDefault();
        const value = e.target.value;
        const data = {
            status: value
        }

        if (!workersCount) {
            return;
        }


        const updatedNeeded = data.status === "approved" ? workersCount - 1 : workersCount + 1;
        const total = updatedNeeded * payable_amount;
        const updateInfo = {
            neededWorkers: updatedNeeded,
            totalSpentCoin: total,
        };


        console.log(updateInfo);



        const message = data.status === 'approved' ? `you have earned ${payable_amount} from ${userInfo.name} for completing $"{title}"` : `${userInfo.name} rejects your task ${title}`

        const notificationInfo = {
            status: data.status,
            to: email,
            from: userInfo.email,
            message: message,
            route: location.pathname,
            time: new Date(),
        }


        if (userInfo?.email) {
            axiosSecure.patch(`/submitTask/${id}`, data)
                .then(async (res) => {

                    if (res.data.modifiedCount) {

                        refetch();
                        const res = await axiosSecure.patch(`/tasks/email/${task_id}`, updateInfo)
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire('status updated!')
                        }


                        const notify = await axiosSecure.post('/notifications', notificationInfo)
                        console.log(notify.data);

                    }

                    if (res.data.modifiedCount && data.status === 'approved') {

                        // user's coin increases
                        axiosSecure.patch(`/users/coin/${email}`, { coinUpdate: payable_amount, status: 'increase' })
                            .then(res => {
                                if (res.data.modifiedCount) {
                                    refetch();
                                    console.log(res.data);
                                }
                            })

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
                                        <select onChange={(e) => handleStatus(e, submit._id, submit.payable_amount, submit.worker_email, submit.neededWorkers, submit.task_id, submit.task_title)} className="select select-bordered select-xs w-full max-w-xs">
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