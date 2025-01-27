
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Sections/SectionTitle/SectionTitle";
import dashImg from '../../../assets/images/woman-carrying-coin-icons.jpg'

const Dashboard = () => {
    return (
        <div>
            <Helmet>
                <title>MicroEarn | Dashboard</title>
            </Helmet>
            <SectionTitle heading='Welcome! Explore the Routes' subHeading='You can manage your things' ></SectionTitle>
            
            <div>
                <img src={dashImg} />
            </div>
            
        </div>
    );
};

export default Dashboard;