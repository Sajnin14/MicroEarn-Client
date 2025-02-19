import { Link } from "react-router-dom";
import SectionTitle from "../../../Sections/SectionTitle/SectionTitle";

const BlogSection = () => {
    return (
        <div>
           <SectionTitle heading='Blogs' subHeading = 'Tips, Tricks & Success Stories!'></SectionTitle>

           <div className="my-12 w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
             <div className="p-4 shadow-lg rounded-md">
                <h3 className="text-lg font-bold">#4 Proven Ways to Maximize Your Earnings on Micro Earn</h3>
                <p>Earning money online can be easy if you use the right strategies. Micro Earn provides various opportunities to generate income, but maximizing your earnings requires smart tactics....</p>
                <Link to='/blogs'><button className="underline font-semibold">Read More →</button></Link>
             </div>

             <div className="p-4 shadow-lg rounded-md">
                <h3 className="text-lg font-bold">#Latest Trends in Online Earning for 2025</h3>
                <p>The online earning landscape is constantly evolving, and 2025 brings new trends and opportunities for individuals looking to generate income digitally. Here are the latest trends shaping......</p>
                <Link to='/blogs'><button className="underline font-semibold">Read More →</button></Link>
             </div>

             <div className="p-4 shadow-lg rounded-md">
                <h3 className="text-lg font-bold">#Step-by-Step Guide: How to Complete Your First Task on Micro Earn</h3>
                <p>Getting started on Micro Earn is easy, and completing your first task is the first step toward earning online. Follow this step-by-step guide to ensure a smooth experience and......</p>
                <Link to='/blogs'><button className="underline font-semibold">Read More →</button></Link>
             </div>

             
           </div>
        </div>
    );
};

export default BlogSection;