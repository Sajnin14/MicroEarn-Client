
import { Helmet } from "react-helmet";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import BestTasks from "../BestTasks/BestTasks";
import BestWorkers from "../BestWorkers/BestWorkers";
import ContactUs from "../ContactUs/ContactUs";
import Testimonial from "../Testimonial/Testimonial";
import BlogSection from "../BlogsSection/BlogSection";
import Faq from "../FaQ/Faq";

const Home = () => {
    return (
        <div className="space-y-14">
            <Helmet>
                <title>MicroEarn | Home</title>
            </Helmet>
           <Banner></Banner>
           <BestWorkers></BestWorkers>
           <Testimonial></Testimonial>
           <BestTasks></BestTasks>
           <BlogSection></BlogSection>
           <AboutUs></AboutUs>
           <Faq></Faq>
           <ContactUs></ContactUs>
        </div> 
    );
};

export default Home;