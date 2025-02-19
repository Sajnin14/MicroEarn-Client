import SectionTitle from "../../../Sections/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import axios from "axios";

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios('review.json')
        .then(res => {
            setReviews(res.data);
        })
    },[])
    return (
        <div id="testimonial">
            <SectionTitle heading='Testimonial' subHeading='Feedback That Inspires Us'></SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-11/12 mx-auto text-center my-20">
                {
                    reviews.map((review, idx) => <SwiperSlide key={idx}>
                        <img src={review.photo} className="w-28 mx-auto rounded-full mb-3" />
                        <p>{review.name}</p>
                        <p className="w-1/2 mx-auto mt-2">&quot;{review.quote}&quot;</p>
                    </SwiperSlide>)
                }
                
            </Swiper>
        </div>
    );
};

export default Testimonial;