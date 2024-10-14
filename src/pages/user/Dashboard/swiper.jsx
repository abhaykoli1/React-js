import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// .swiper {
//     width: 100%;
//     padding-top: 50px;
//     padding-bottom: 50px;
//   }

//   .swiper-slide {
//     background-position: center;
//     background-size: cover;
//     width: 300px;
//     height: 300px;
//   }

//   .swiper-slide img {
//     display: block;
//     width: 100%;
//   }
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const ReviewsData = [
  {
    id: 1,
    // icon: "fas fa-clone",
    name: "Vishal mihsra",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisi psum dolor sit amet, consectetur adipisicing elit. Nob psum dolor sit amet, consectetur adipisicing elit. Nob psum dolor sit amet, consectetur adipisicing elit. Nob psum dolor sit amet, consectetur adipisicing elit. Nobcing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
  },
  {
    id: 2,
    icon: "fas fa-snowflake",
    name: "Sharad",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
  },
  {
    id: 3,
    name: "Khana",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
  },
  {
    id: 4,

    name: "Mohit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
  },
  {
    id: 5,

    name: "Abin",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
  },
  {
    id: 6,

    name: "Rohan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, vel! Accusantium hic fugiat laudantiu earum consequuntur, unde nam et mollitia eaque incidunt sed.",
  },
];
export default function Slider() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper h-[550px] "
        autoplay={{
          delay: 1000, // autoplay every 3 seconds
          disableOnInteraction: false, // autoplay will not be disabled after user interaction
        }}
      >
        {ReviewsData.map((review, index) => (
          <SwiperSlide
            key={index}
            sm={4}
            className="flex flex-col justify-between bg-white w-[500px] h-[350px] shadow-lg p-4 mx-5 rounded-[20px]"
          >
            <p
              className="
                text-center flex-1 justify-center items-center 
                text-ellipsis overflow-hidden"
            >
              {review.description}
            </p>

            <div className="flex h-20   mb-2">
              <img src={review.image} className="rounded-full h-20 w-20" />
              <h3 className="pl-5 flex-1  bg-red-300 flex items-center  font-bold text-xl mt-5 mb-2">
                {review.name}
              </h3>
            </div>
            {/* </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
