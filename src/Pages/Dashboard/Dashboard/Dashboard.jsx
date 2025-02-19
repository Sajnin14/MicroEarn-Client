
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Sections/SectionTitle/SectionTitle";
// import dashImg from '../../../assets/images/woman-carrying-coin-icons.jpg'
import useUser from "../../../hooks/useUser";

const Dashboard = () => {
    const [userInfo] = useUser();
    return (
        <div>
            <Helmet>
                <title>MicroEarn | Dashboard</title>
            </Helmet>
            <SectionTitle heading='Welcome! Explore the Routes' subHeading='You can manage your things' ></SectionTitle>
            
            <div className="text-center">
                <h3 className="text-3xl font-bold text-center uppercase">
                    {userInfo.name}</h3>
                    <p className="my-5 font-semibold">{userInfo.email}</p>
                <img src={userInfo.photo} className="mx-auto w-full"/>
            </div>
            
        </div>
    );
};

export default Dashboard;