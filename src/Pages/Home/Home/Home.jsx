
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import BestTasks from "../BestTasks/BestTasks";
import BestWorkers from "../BestWorkers/BestWorkers";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <div className="space-y-14">
           <Banner></Banner>
           <BestWorkers></BestWorkers>
           <Testimonial></Testimonial>
           <BestTasks></BestTasks>
           <AboutUs></AboutUs>
        </div> 
    );
};

export default Home;