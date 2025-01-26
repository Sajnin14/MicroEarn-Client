import { useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const UpdateTask = () => {  

    const axiosSecure = useAxiosSecure();
    const loader = useLoaderData();
    const navigate = useNavigate();
    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const submission = form.submission.value;
        const details = form.details.value;

        const updateInfo = {title, submission, details}

        Swal.fire({
            title: "Are you sure?",
            text: "your task will be updated",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"

          }).then(async (result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/tasks/email/${loader._id}`, updateInfo)
                .then(res => {            
                    if(res.data.modifiedCount){
                        Swal.fire({
                            title: "Updated!",
                            text: "Your task has been updated.",
                            icon: "success"
                          });
                    }

                    navigate('/dashboard/myTasks')
                })
                
            }
          });
    }
    return (
        <div>
           <SectionTitle heading='Update Task' subHeading='update your task here'></SectionTitle> 

           <form onSubmit={handleUpdate} className="m-5 p-10">

                {/* first coumn */}
                <div className="md:flex gap-3">
                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input type="text" placeholder={loader.title} name='title' className="input input-bordered" />
                    </div>

                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Task Image</span>
                        </label>
                        <input type="text" placeholder={loader.taskImage} name='taskImage'  className="input input-bordered" disabled />

                    </div>
                </div>

                {/* second row */}
                <div className="md:flex gap-3">

                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Required Workers</span>
                        </label>
                        <input type="number" placeholder={loader.neededWorkers} name='neededWorkers' className="input input-bordered" disabled />
                    </div>

                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Payable Coin</span>
                        </label>
                        <input type="number" placeholder={loader.payCoin} name='ammount' className="input input-bordered" disabled />
                    </div>
                </div>

                {/* third row */}

                <div className="md:flex gap-3">
                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Completion Date</span>
                        </label>
                        <input type='date' placeholder={loader.completionDate} name='date'  className="input input-bordered" disabled />
                    </div>

                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Submission Info</span>
                        </label>
                        <input type="text" placeholder
                        ={loader.submission} name='submission'  className="input input-bordered" />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Details</span>
                    </label>
                    <input type="text" placeholder
                    ={loader.details} name='details'  className="input input-bordered" />
                </div>

                <div className="form-control">
                    <input type="submit" value="Add New Task" className="input input-bordered my-7 text-white bg-[#007bFF]" />
                </div>

            </form>
        </div>
    );
};

export default UpdateTask;