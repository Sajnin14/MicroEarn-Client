import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        axiosSecure.get('/tasks')
            .then(res => {
                setTasks(res.data)
            })
    }, [axiosSecure])
    return (
        <div>
            <SectionTitle heading='All Tasks' subHeading='go through your desired tasks'></SectionTitle>


            <div className="pb-10 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    tasks.filter(task => task.neededWorkers > 0).map(task => <div key={task._id} className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img
                                src={task.taskImage}
                                className="rounded-xl h-48" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{task.title}</h2>
                            <p>Buyer Name: {task.buyerName}</p>
                            <p>Buyer Email: {task.buyerEmail}</p>
                            <p>completion Date: {task.completionDate}</p>
                            <p>Payable Coin: {task.payCoin}</p>
                            <p>Required Workers: {task.neededWorkers}</p>
                            
                            <div className="card-actions">
                                <Link to={`/dashboard/taskDetails/${task._id}`}><button className="btn btn-primary">View Details<FaArrowAltCircleRight className="text-xl" /> </button></Link>
                                
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default TaskList;