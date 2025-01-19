import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { FaEdit } from "react-icons/fa";
import {  RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";


const MyTasks = () => {
    const [userInfo] = useUser();
    const axiosPublic = useAxiosPublic();

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks', userInfo?.email],
        queryFn: async () => {
            const task = await axiosPublic.get(`/tasks/${userInfo.email}`);
            return (task.data);
        },
    })
    
    const topTasks = tasks.sort((a,b) => b.date - a.date);
    
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
                            
                            <td><button><RiDeleteBin6Fill className="text-red-600 text-lg" /></button> </td>
                        </tr>)
                       }
                       
                        
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTasks;