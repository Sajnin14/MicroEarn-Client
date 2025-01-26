import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";
import useUser from "../../../../hooks/useUser";
import './workerSubmission.css'

const WorkerSubmissions = () => {
    const [userInfo] = useUser();
    const axiosSecure = useAxiosSecure();
    const [submissions, setSubmissions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    useEffect(() => {
        axiosSecure.get(`/submitTask?email=${userInfo.email}&page=${currentPage}&size=${itemsPerPage}`)
            .then(res => {
                setSubmissions(res.data);
            })
    }, [axiosSecure, userInfo, currentPage, itemsPerPage])
    
    useEffect(() => {
        axiosSecure.get(`/submitTask?email=${userInfo.email}`)
            .then(res => {
                const data = res.data;
                setCount(data.length); 
            })
    }, [axiosSecure, userInfo])

    
    

    const numberOfPages = Math.ceil(count / itemsPerPage);
    // const numberOfPages = Math.ceil(anotherCount/itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];
     
    const handlePagination = e => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(0);
    }

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }

    }

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }


    return (
        <div>
            <SectionTitle heading='My Submissions' subHeading='--tasks I submitted--'></SectionTitle>

            <div className="overflow-x-auto md:m-14 mt-0">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-xs md:text-base">
                            <th className="hidden md:block"></th>
                            <th>Title</th>
                            <th>Provider Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            submissions.map((submit, idx) => <tr key={idx} className="text-xs md:text-base">
                                <th className="hidden md:block">{idx + 1}</th>
                                <td>{submit.task_title}</td>
                                <td>{submit.Buyer_email}</td>
                                <td className="bg-slate-100 rounded-lg text-yellow-600 font-bold">{submit.status}</td>
                            </tr>)
                        }
                        

                    </tbody>
                </table>
            </div>

         <div className="pagination">
            <p>currentPage : {currentPage}</p>
            <button onClick={handlePrevious}>Previous</button>
            {
                pages.map((page, idx) => <button className={currentPage === page && 'selected'} onClick={() => setCurrentPage(page)} key={idx}>{page}</button>)
            }
            <button onClick={handleNext}>Next</button>
            <select value={itemsPerPage} onChange={handlePagination}>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
         </div>
        </div>
    );
};

export default WorkerSubmissions;