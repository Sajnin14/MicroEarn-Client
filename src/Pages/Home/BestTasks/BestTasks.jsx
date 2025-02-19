import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../Sections/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BestTasks = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosPublic.get('/tasks')
            .then(res => {
                setTasks(res.data);
            })
    }, [axiosPublic])


    const topTasks = tasks.sort((a, b) => b.neededWorkers - a.neededWorkers).slice(0, 6);

   const handleExplore = () =>{
    if(!user && user?.email){
        navigate('/login');
    }
    
    else{
        navigate('/dashboard');
    }

   }

    return (
        <div id="bestTasks" className="w-11/12 mx-auto mb-10">
            <SectionTitle heading='Best Tasks' subHeading='Earn more with less effort!'></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    topTasks.map(top => <div key={top._id} className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img
                                src={top.taskImage}
                                className="rounded-xl object-fill w-full h-48" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{top.title}</h2>

                            <p className="font-semibold">Needed Workers: {top.neededWorkers}</p>
                            <p>Pay Coin: {top.payCoin}</p>

                        </div>
                    </div>
                    )
                }
            </div>

            <div className="text-center my-24">

                <button onClick={handleExplore} className="btn bg-[#FFC107] text-white ">Click Here To Explore</button>
            </div>
        </div>
    );
};

export default BestTasks;