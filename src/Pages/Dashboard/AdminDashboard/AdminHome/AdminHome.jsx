import useUser from "../../../../hooks/useUser";
import SectionTitle from "../../../../Sections/SectionTitle/SectionTitle";

const AdminHome = () => {
    const [userInfo] = useUser();
    return (
        <div>
            <SectionTitle heading={`Sir ,${userInfo.name}`} subHeading='--Please control the website--'></SectionTitle>
        </div>
    );
};

export default AdminHome;