import { useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../../../../Sections/SectionTitle/SectionTitle";
import './TaskDetails.css'
import useUser from "../../../../../hooks/useUser";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TaskDetails = () => {
    const loader = useLoaderData();
    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit =async(e) => {
        e.preventDefault();
        const submit = e.target.submit.value;
        // console.log(submit);
        
        const submitInfo = {
            submissionInfo: submit,
            task_id : loader._id,
            task_title : loader.title,
            payable_amount: loader.payCoin,
            neededWorkers : loader.neededWorkers,
            totalSpentCoin : loader.totalSpentCoin,
            worker_email: userInfo.email,
            worker_name: userInfo.name,
            Buyer_name: loader.buyerName,
            Buyer_email: loader.buyerEmail,
            current_date: new Date(),
            status: 'Pending'
        }

        const notificationInfo = {
            status: 'submited',
            to: loader.buyerEmail,
            from: userInfo.email,
            message: `${userInfo.name} submitted task --${loader.title}-- on ${new Date()}`,
            route: location.pathname,
            time: new Date(),
        }

        console.log(notificationInfo);



        const res = await axiosSecure.post('/submitTask', submitInfo)
        console.log(res.data);
        if(res.data.insertedCount){
            Swal.fire({
                title: "Task Submission completed!",
                icon: "success",
                timer: 1500
              });

            axiosSecure.post('/notifications', notificationInfo)
            .then(res => {
                console.log(res.data)
            })

            navigate('/dashboard/workerSubmissions')
        }
        
    }
    return (
        <div>
            <SectionTitle heading='Task Details' subHeading='see details about the task'></SectionTitle>



            <div className="text-center lg:text-left card shadow-lg m-10 p-10">
                <h1 className="text-xl font-bold">Task: {loader.title}</h1>
                <p className="py-3">{loader.details}</p>
                <p><span>coin: </span>{loader.payCoin}</p>
                <p><span>Needed Workers : </span>{loader.neededWorkers} </p>
                <p><span>Completion Date :</span> {loader.completionDate}</p>
                <p><span>Buyer Name:</span> {loader.buyerName}</p>
                <p><span>Buyer Email:</span> {loader.buyerEmail}</p>
                <p><span>Submit: </span>{loader.submission}</p>

                <form onSubmit={handleSubmit}>
                    <textarea name='submit' placeholder="Submit Your Work" className="input input-bordered w-full max-w-xs mt-10" required></textarea>
                    <div>
                        <button className="btn bg-[#007BFF]">Submit</button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default TaskDetails;