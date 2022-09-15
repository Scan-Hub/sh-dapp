import React from "react";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import telegram from "../../assets/images/footer/telegram.png";
import twitter from "../../assets/images/footer/twitter.png"; 
import { useNavigate } from "react-router-dom";

SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);


const Partnership_carousel = ({ val }) => {
  const Navigate = useNavigate();
  async function handlClick(event) {
    Navigate("../partnershipdetail/" + event, { replace: true });
  }
  return (
    <Swiper
      effect={"fade"}
      grabCursor={true}
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
      {(val.map((array_val, i) => {
        return (

          <SwiperSlide key={i} className="w-[25%]">
            {(array_val.map((val, a) => 
              <div key={a} className="rounded-2xl bg-[#191B2A] carousel-content mb-[8px]">
                <div key={i} className="flex p-4 bg-[#191B2A] hover:scale-105 cursor-pointer" onClick={() => (handlClick(val.item))}>
                  <img className="mr-[24px] rounded-xl" src={val.img} />
                  <div>
                    <p className=" font-montserrat_bold leading-[24px]">{val.item}</p>
                    <p className=" text-[14px]">{val.item}</p>
                    <div className='flex mt-4'>
                      <img className='w-[20px] mr-4' src={telegram} />
                      <img className='w-[20px]' src={twitter} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </SwiperSlide>

        );
      }))}
    </Swiper>
  );
};

export default Partnership_carousel;