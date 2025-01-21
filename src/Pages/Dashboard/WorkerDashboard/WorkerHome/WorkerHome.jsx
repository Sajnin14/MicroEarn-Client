import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";

const WorkerHome = () => {
    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/submitTask?email=${userInfo.email}`)
            .then(res => {
                setSubmissions(res.data)
            })
    }, [axiosSecure, userInfo?.email])

    const pendingSubmission = submissions.filter(submits => submits.status?.toLowerCase() === 'pending');

    const approvedSubmission = submissions.filter(submits => submits.status?.toLowerCase() === 'approved');

    const approvedPayment = approvedSubmission.reduce((total, item) => total + item.payable_amount, 0);


    return (
        <div>
            <SectionTitle heading={`Welcome ${userInfo.name}`} subHeading='explore your submitted tasks'> </SectionTitle>

            <div className="m-10">
                <div className="flex flex-col lg:flex-row items-center justify-between my-10 text-xl font-bold">
                    <p>Total Submitted Task: {submissions.length}</p>
                    <p>Total Pending Task: {pendingSubmission.length}</p>

                    <p>Total Payment: {approvedPayment}</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>task_title</th>
                                <th>payable_amount</th>
                                <th>Buyer_name</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                approvedSubmission.map((approve, index) => <tr key={index} className="bg-base-200">
                                    <th>{index + 1}</th>
                                    <td>{approve.task_title}</td>
                                    <td>{approve.payable_amount}</td>
                                    <td>{approve.Buyer_name}</td>
                                    <td>{approve.status}</td>
                                </tr>)
                            }



                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default WorkerHome;