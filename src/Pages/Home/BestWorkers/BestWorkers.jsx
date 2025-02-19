import { useEffect, useState } from "react";
import SectionTitle from "../../../Sections/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const BestWorkers = () => {
    const axiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosPublic.get('/users')
            .then(res => {
                setUsers(res.data);
            })
    }, [axiosPublic])

    const totalWorkers = users.filter(users => users.role?.toLowerCase() === 'worker');

    const topWorkers = totalWorkers.sort((a, b) => b.coin - a.coin).slice(0, 6);

    return (
        <div id="bestWorkers">
            <SectionTitle heading='Best Workers' subHeading='Honoring Our Best MicroEarn Achievers!'></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-11/12 mx-auto">
                {
                    topWorkers.map(top => <div key={top._id} className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                          <img
                            src={top.photo}
                            className="rounded-xl w-full object-cover h-64" />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">{top.name}</h2>
                          <p className="font-semibold">Total Coin: {top.coin}</p>
                          
                        </div>
                      </div>
                    )
                }
            </div>
        </div>
    );
};

export default BestWorkers;