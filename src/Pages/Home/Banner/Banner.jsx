import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/images/image1.jpg'
import img2 from '../../../assets/images/image2.jpg'
import img3 from '../../../assets/images/image3.jpg'
import img4 from '../../../assets/images/image4.jpg'


const Banner = () => {
    return (
            <Carousel className="min-h-screen">
                <div>
                    <img src={img1} className="h-[400px] w-full object-cover"/>
                    <p className="legend">Simplifying Micro Tasks for Maximum Rewards.</p>
                </div>

                <div>
                    <img src={img2} className="h-[400px] w-full object-cover"/>
                    <p className="legend">Small Tasks, Big Earnings!</p>
                </div>
                <div>
                    <img src={img3} className="h-[400px] w-full object-cover"/>
                    <p className="legend">Your Trusted Platform for Earning Made Easy.</p>
                </div>
                
                <div>
                    <img src={img4} className="h-[400px] w-full object-cover"/>
                    <p className="legend">Unlock Earnings with Every Click.</p>
                </div>
            </Carousel>
    );
};

export default Banner;