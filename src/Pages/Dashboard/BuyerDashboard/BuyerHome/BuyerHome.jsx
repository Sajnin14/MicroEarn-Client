import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useState } from "react";




const BuyerHome = () => {

    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();
    const [submitInfo, setSubmitInfo] = useState('Task Completed');
    const location = useLocation();

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


    const handleDetails = (submissionInfo) => {
        const submission = submissionInfo || "completed all requirements";
        setSubmitInfo(submission);
        document.getElementById('my_modal_1').showModal();

    }

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


                        axiosSecure.post('/notifications', notificationInfo)
                            .then(() => { })


                    }

                    if (res.data.modifiedCount && data.status === 'approved') {

                        // user's coin increases
                        axiosSecure.patch(`/users/coin/${email}`, { coinUpdate: payable_amount, status: 'increase' })
                            .then(res => {
                                if (res.data.modifiedCount) {
                                    refetch();
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
                    <table className="table hidden md:table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Worker Name</th>
                                <th>Payable Amount</th>
                                <th>View Submission Details</th>
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
                                    <td><button onClick={() => handleDetails(submit.submissionInfo)} className="btn">sumission details</button></td>
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


                {/* Card layout for smaller screens */}
                <div className="md:hidden">
                    {submissions.map((submit, idx) => (
                        <div
                            key={idx}
                            className="border rounded-lg p-4 mb-4 bg-base-200 shadow-md"
                        >
                            <p className="font-bold">Task #{idx + 1}</p>
                            <p>
                                <strong>Title:</strong> {submit.task_title}
                            </p>
                            <p>
                                <strong>Worker Name:</strong> {submit.worker_name}
                            </p>
                            <p>
                                <strong>Payable Amount:</strong> {submit.payable_amount}
                            </p>
                            <p>
                                <strong>Status:</strong> {submit.status}
                            </p>
                            <div className="mt-2">
                                <button
                                    onClick={() => handleDetails(submit.submissionInfo)}
                                    className="btn btn-sm btn-primary"
                                >
                                    View Submission Details
                                </button>
                            </div>
                            <div className="mt-2">
                                <select
                                    onChange={(e) =>
                                        handleStatus(
                                            e,
                                            submit._id,
                                            submit.payable_amount,
                                            submit.worker_email,
                                            submit.neededWorkers,
                                            submit.task_id,
                                            submit.task_title
                                        )
                                    }
                                    className="select select-bordered select-sm w-full"
                                >
                                    <option defaultValue={submit.status || "pending"}>
                                        {submit.status}
                                    </option>
                                    <option value="approved">approved</option>
                                    <option value="rejected">rejected</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Submission Details:</h3>
                    <p className="py-4">{submitInfo}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default BuyerHome;