import SectionTitle from "../../../Sections/SectionTitle/SectionTitle";
import bgImg from '../../../assets/images/image1.jpg'

const AboutUs = () => {
    return (
        <div id="aboutUs"
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${bgImg})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="text-center text-white">
                <SectionTitle heading='About Us' subHeading='Empowering You to Earn, One Simple Task at a Time.'></SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 w-11/12 mx-auto">
                    <div className="card text-black bg-base-100 shadow-xl opacity-60 hover:scale-105">
                        <div className="card-body z-50 text-center">
                            <h2 className="font-bold text-2xl">Who We Are!</h2>
                            <p>We are a passionate team dedicated to creating simple and rewarding opportunities for individuals to earn money online. Our mission is to empower people around the world to achieve financial independence through micro-tasks that are easy to complete and accessible to everyone.</p>
                        </div>
                    </div>

                    <div className="card text-black bg-base-100 shadow-xl opacity-60 hover:scale-105">
                        <div className="card-body z-50 text-center">
                            <h2 className="font-bold text-2xl">What We Provide!</h2>
                            <p>At <span className="font-semibold">MicroEarn</span>, we provide a variety of ways for you to earn money from the comfort of your home. Whether it is completing surveys, watching videos, testing apps, or performing simple data tasks, we have something for everyone. Our platform is designed to be user-friendly, efficient, and rewarding.</p>

                        </div>
                    </div>


                    <div className="card text-black bg-base-100 shadow-xl opacity-60 hover:scale-105">
                        <div className="card-body z-50">
                            <h2 className="font-bold text-2xl text-center">How It Works?</h2>
                            <ul className="text-start">
                                <li><span className="font-semibold">Sign Up:</span> Create your free account in just a few clicks.</li>
                                <li><span className="font-semibold">Browse Tasks:</span> Explore a wide range of tasks tailored to your interests.</li>

                                <li><span className="font-semibold">Complete & Earn:</span> Finish tasks and earn rewards directly in your account.

                                </li>

                                <li><span className="font-semibold">Get Paid:</span> Withdraw your earnings via trusted methods such as bKash, Nagad, Rocket, gift cards, or direct transfers.</li>

                            </ul>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;