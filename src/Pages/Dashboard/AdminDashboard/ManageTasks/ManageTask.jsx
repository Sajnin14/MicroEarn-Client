import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageTask = () => {
    const axiosSecure = useAxiosSecure();
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const task = await axiosSecure.get('/tasks');
            return (task.data);
        },
    })

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/tasks/email/${id}`)
                if (res.data.deletedCount) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });

    }

    return (
        <div>
            <SectionTitle heading='All Tasks List' subHeading='Manage All Tasks here'></SectionTitle>

            <div className="overflow-x-auto hidden md:block pr-12">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>title</th>
                            <th>details</th>
                            <th>payCoin</th>
                            <th>Needed Workers</th>
                            <th>Completion Date</th>
                            <th>Buyer Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tasks.map((task, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{task.title}</td>
                                <td>{task.details}</td>
                                <td>{task.payCoin}</td>
                                <td>{task.neededWorkers}</td>
                                <td>{task.completionDate}</td>
                                <td>{task.buyerEmail}</td>
                                <td><button onClick={() => handleDelete(task._id)}><RiDeleteBin6Fill className="text-red-600 text-lg" /></button> </td>


                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

            <div className="md:hidden">
                {tasks.map((task, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4 bg-base-200 shadow-md">
                        <p className="font-bold">Task #{index + 1}</p>
                        <p>
                            <strong>Title:</strong> {task.title}
                        </p>
                        <p>
                            <strong>Details:</strong> {task.details}
                        </p>
                        <p>
                            <strong>Pay Coin:</strong> {task.payCoin}
                        </p>
                        <p>
                            <strong>Needed Workers:</strong> {task.neededWorkers}
                        </p>
                        <p>
                            <strong>Completion Date:</strong> {task.completionDate}
                        </p>
                        <p>
                            <strong>Buyer Email:</strong> {task.buyerEmail}
                        </p>
                        <div className="flex justify-start mt-3">
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="btn btn-sm btn-error"
                            >
                                <RiDeleteBin6Fill className="text-lg mr-1" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageTask;