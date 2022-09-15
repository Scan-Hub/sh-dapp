import React from "react";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import linkin from "../../assets/images/project/project_icon/linkin.svg";
SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);

const LazyloadImage = ({ val }) => {
  return (
    <Swiper
      effect={"fade"}
      grabCursor={true}
      loop={true}
      spaceBetween={20}
      pagination={true}
      autoplay={{ delay: 2000 }}
      breakpoints={{
        780: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        },
        1580: {
          slidesPerView: 4,
        },
      }}
      className="mySwiper"
    >
      {val.map((val, i) => {
        return (
          <SwiperSlide key={i} className="w-[25%]">
            <div className="rounded-2xl bg-[#191B2A] text-center carousel-content">
              <img
                src={val.profile_picture}
                className="mx-auto w-20 h-20 object-cover object-center rounded-full"
              />
              <p className="font-bold montserrat_bold text-[18px] text-[#FFFFFF] my-6">
                {val.profile_name}
              </p>
              <div className="flex justify-center items-center mb-6">
                <p className="font-bold montserrat_bold text-[18px] text-[#FFFFFF] carousel-position contents">
                  {val.title}
                </p>
                <a
                  className="ml-5"
                  href={val.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkin} />
                </a>
              </div>
              <p className=" text-[#7B7E88]">
                He is the person behind the development of the Fan$quad smart
                contract that was deployed on Col-4 during the Hackathon
                organized by Terraformlab....
              </p>
              <button className="py-1.5 px-4 rounded-[32px] border border-[#00AF71] mt-6 ">
                Read more
              </button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default LazyloadImage;
