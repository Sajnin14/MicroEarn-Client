
import Swal from "sweetalert2";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { imageUploade } from "../../../../hooks/imageUploade";
import useUser from "../../../../hooks/useUser";

const AddTask = () => {

    const [userInfo, refetch] = useUser();


    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleAddTask = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const taskImage = form.taskImage.files[0];
        const ammount = parseInt(form.ammount.value);
        const neededWorkers = parseInt(form.neededWorkers.value);
        const date = form.date.value;
        const submission = form.submission.value;
        const details = form.details.value;


        if (ammount < 1 || neededWorkers < 1) {
            setError(true);
            return;
        }

        setError(false);

        const totalCoin = userInfo.coin;
        const totalAmmount = ammount * neededWorkers;
        console.log(totalAmmount, totalCoin);
        if (totalAmmount > totalCoin) {

            Swal.fire({
                icon: "error",
                title: "Not available Coin.",
                text: "Purchase Coin to add tasks",
                // timer: 1500,
            });
            navigate('/dashboard/purchaseCoin');
            return;

        }

        const photoBB = await imageUploade(taskImage);

        const tasksInfo = {
            title: title,
            taskImage: photoBB,
            payCoin: ammount,
            neededWorkers: neededWorkers,
            totalSpentCoin: totalAmmount,
            completionDate: date,
            submission: submission,
            details: details,
            buyerName: userInfo.name,
            buyerEmail: userInfo.email,
        }

        console.log(tasksInfo);


         
        
        axiosSecure.post('/tasks', tasksInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    console.log(res.data);
                }
                Swal.fire({
                    title: "tasks has been added!",
                    icon: "success",
                    timer: 1500,
                });


                axiosSecure.patch(`/users/coin/${userInfo.email}`, { coinUpdate: totalAmmount, status: 'decrease' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            console.log(res.data);
                        }

                    })

                navigate('/dashboard/myTasks')
            })

        // axiosSecure.post('/tasks', )
        // console.log(title, taskImage, ammount, neededWorkers, date, submission, details);


    }
    return (
        <div>
            <SectionTitle heading='Add New Task' subHeading='create new work for workers'></SectionTitle>

            <form onSubmit={handleAddTask} className="m-5 p-10">

                {/* first coumn */}
                <div className="md:flex gap-3">
                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input type="text" name='title' placeholder="add task title" className="input input-bordered" required />
                    </div>

                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Task Image</span>
                        </label>
                        <input type="file" name='taskImage' placeholder="provide a image for task" className="input input-bordered" required />

                    </div>
                </div>

                {/* second row */}
                <div className="md:flex gap-3">

                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Required Workers</span>
                        </label>
                        <input type="number" name='neededWorkers' placeholder="how many workers you needed?" className="input input-bordered" required />
                    </div>

                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Payable Coin</span>
                        </label>
                        <input type="number" name='ammount' placeholder="how much you will pay?" className="input input-bordered" required />
                    </div>
                </div>

                {
                    error && <p className="text-red-600 text-center m-2">coins and needed workers can not be less then 1</p>
                }


                {/* third row */}

                <div className="md:flex gap-3">
                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Completion Date</span>
                        </label>
                        <input type='date' name='date' placeholder="last date of the task" className="input input-bordered" required />
                    </div>

                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Submission Info</span>
                        </label>
                        <input type="text" name='submission' placeholder="what to submit" className="input input-bordered" required />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Details</span>
                    </label>
                    <input type="text" name='details' placeholder="add task details" className="input input-bordered" required />
                </div>



                <div className="form-control">
                    <input type="submit" value="Add New Task" className="input input-bordered my-7 text-white bg-[#007bFF]" />
                </div>



            </form>
        </div>
    );
};

export default AddTask;