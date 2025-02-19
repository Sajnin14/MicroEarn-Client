
import { useEffect, useState } from "react";
import SectionTitle from "../../../Sections/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, ...];


const Faq = () => {

    const [tasks, setTasks] = useState();
    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        axiosPublic.get('/tasks')
            .then(res => {
                setTasks(res.data);
            })
    }, [axiosPublic])


    return (
        <div>
            <SectionTitle heading='FaQ and Feedbacks' subHeading='Got Questions? We have Got Answers! Your Feedback Drives Us Forward.'></SectionTitle>

            <div className="w-11/12 mx-auto my-14 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="join join-vertical w-full">
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-xl font-medium"> Is Micro Earn free to join?</div>
                        <div className="collapse-content">
                            <p>Yes! Micro Earn is completely free to join. There are no registration fees or hidden charges.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">What payment methods are available?</div>
                        <div className="collapse-content">
                            <p>Micro Earn supports multiple withdrawal options, including Card, bKash, Nagad, Rocket.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium"> Is there a minimum withdrawal limit?</div>
                        <div className="collapse-content">
                            <p>Yes, you have to withdraw minimum $20</p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium"> Why was my task submission rejected?</div>
                        <div className="collapse-content">
                            <p>Common reasons include incorrect or incomplete submissions, failure to follow instructions, or submitting duplicate work.</p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium"> Can I complete multiple tasks at the same time?</div>
                        <div className="collapse-content">
                            <p>Yes, you can work on multiple tasks as long as you meet the task requirements and deadlines.</p>
                        </div>
                    </div>

                </div>

                <div>
                    <BarChart width={900} height={400} data={tasks}>
                        <Bar dataKey="payCoin" barSize={40} fill='#457B9D'></Bar>
                        <XAxis dataKey="neededWorkers"></XAxis>
                        <YAxis dataKey="payCoin"></YAxis>
                        <Tooltip></Tooltip>
                    </BarChart>
                    <p className="ml-28">needed workers →</p>
                </div>
            </div>
        </div>
    );
};

export default Faq;