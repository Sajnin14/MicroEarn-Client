import { useQuery } from "@tanstack/react-query";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MyTasks = () => {
    const [userInfo, refetch] = useUser();
    const axiosSecure = useAxiosSecure();

    const { data: tasks = [] } = useQuery({
        queryKey: ['tasks', userInfo?.email],
        queryFn: async () => {
            const task = await axiosSecure.get(`/tasks/${userInfo.email}`);
            return (task.data);
        },
    })

    const topTasks = tasks.sort((a, b) => b.datcompletionDate - a.completionDate);

    const handleDelete = (task) => {
        const totalCoin = task.totalSpentCoin;

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tasks/email/${task._id}`)
                    .then(() => {

                        // code for increase coin after validation

                        axiosSecure.patch(`/users/coin/${userInfo.email}`, { coinUpdate: totalCoin, status: 'increase' })
                            .then(() => {
                                refetch();

                            })
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })

            }
        });


    }

    return (
        <div>
            <SectionTitle heading='My Tasks' subHeading='tasks added by me!'></SectionTitle>

            <div className="overflow-x-auto p-12">
                <table className="table table-zebra hidden md:table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Task Title</th>
                            <th>Deadline</th>
                            <th>Coin</th>
                            <th>Needed Workers</th>
                            <th>Total Pay</th>
                            <th>Submission</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topTasks.map((task, idx) => <tr key={task._id}>
                                <th>{idx + 1}</th>
                                <td>{task.title}</td>
                                <td>{task.completionDate}</td>
                                <td>{task.payCoin}</td>
                                <td>{task.neededWorkers}</td>
                                <td>{task.totalSpentCoin}</td>
                                <td>{task.submission}</td>
                                <td> <Link to={`/dashboard/updateTask/${task._id}`}><FaEdit className="text-lg"></FaEdit></Link></td>

                                <td><button onClick={() => handleDelete(task)}><RiDeleteBin6Fill className="text-red-600 text-lg" /></button> </td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>


            {/* Card layout for smaller screens */}
            <div className="md:hidden space-y-4">
                {topTasks.map((task, idx) => (
                    <div
                        key={task._id}
                        className="border rounded-lg p-4 bg-base-200 shadow-md"
                    >
                        <p className="font-bold">Task #{idx + 1}</p>
                        <p>
                            <strong>Task Title:</strong> {task.title}
                        </p>
                        <p>
                            <strong>Deadline:</strong> {task.completionDate}
                        </p>
                        <p>
                            <strong>Coin:</strong> {task.payCoin}
                        </p>
                        <p>
                            <strong>Needed Workers:</strong> {task.neededWorkers}
                        </p>
                        <p>
                            <strong>Total Pay:</strong> {task.totalSpentCoin}
                        </p>
                        <p>
                            <strong>Submission:</strong> {task.submission}
                        </p>
                        <div className="flex justify-between mt-2">
                            <Link
                                to={`/dashboard/updateTask/${task._id}`}
                                className="btn btn-sm btn-primary"
                            >
                                <FaEdit />
                                Update
                            </Link>
                            <button
                                onClick={() => handleDelete(task)}
                                className="btn btn-sm btn-error"
                            >
                                <RiDeleteBin6Fill />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTasks;