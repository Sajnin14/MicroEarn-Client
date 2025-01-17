import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer footer-center bg-[#CCE5FF] p-10">
            <aside>
                <p className="text-4xl font-bold text-[#007BFF]">
                Micro<span className="text-[#FFC107]">Earn</span>
                </p>
                <p>Copyright ©Sajnin Akhter Saima {new Date().getFullYear()} - All right reserved</p>
            </aside>
            
            <nav>
                <div className="grid grid-flow-col text-2xl gap-4">
                    <a href="https://www.linkedin.com/in/sajnin-akhter-saima/" target="blank"> <FaLinkedin></FaLinkedin> </a>
                    <a href="https://github.com/Sajnin14"> <FaGithub></FaGithub></a>
                    <a href="https://www.facebook.com/saima.sajnin.9"><FaFacebook></FaFacebook></a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;