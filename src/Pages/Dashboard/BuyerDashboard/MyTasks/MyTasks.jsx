import { useQuery } from "@tanstack/react-query";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { FaEdit } from "react-icons/fa";
import {  RiDeleteBin6Fill } from "react-icons/ri";
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
    
    const topTasks = tasks.sort((a,b) => b.date - a.date);

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
                        // if (res.data.modifiedCount > 0) {
                        //     console.log(res.data);
                        // }

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
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Task Title</th>
                            <th>Completion Date</th>
                            <th>Submission Details</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        topTasks.map((task, idx) =>  <tr key={task._id}>
                            <th>{idx + 1}</th>
                            <td>{task.title}</td>
                            <td>{task.completionDate}</td>
                            <td>{task.submission}</td>
                            <td> <Link to={`/dashboard/updateTask/${task._id}`}><FaEdit className="text-lg"></FaEdit></Link></td>

                            <td><button onClick={() => handleDelete(task)}><RiDeleteBin6Fill className="text-red-600 text-lg" /></button> </td>
                        </tr>)
                       }
                       
                        
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTasks;