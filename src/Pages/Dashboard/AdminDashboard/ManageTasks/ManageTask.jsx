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
             if(res.data.deletedCount){
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

            <div className="overflow-x-auto pr-12">
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
        </div>
    );
};

export default ManageTask;