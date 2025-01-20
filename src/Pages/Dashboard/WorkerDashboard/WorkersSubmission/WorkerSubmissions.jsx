import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import useUser from "../../../../hooks/useUser";

const WorkerSubmissions = () => {
    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/submitTask?email=${userInfo.email}`)
            .then(res => {
                setSubmissions(res.data)
            })
    }, [axiosSecure, userInfo])

    return (
        <div>
            <SectionTitle heading='My Submissions' subHeading='--tasks I submitted--'></SectionTitle>

            <div className="overflow-x-auto m-14 mt-0">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Provider Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submissions.map((submit, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{submit.task_title}</td>
                                <td>{submit.Buyer_email}</td>
                                <td className="bg-slate-100 rounded-lg text-yellow-600 font-bold">{submit.status}</td>
                            </tr>)
                        }
                        

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default WorkerSubmissions;