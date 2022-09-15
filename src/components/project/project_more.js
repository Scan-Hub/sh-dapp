import React from "react";
import right from "../../assets/images/project/project_icon/right.svg";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useNavigate } from "react-router-dom";

const ProjectMore = ({ data }) => {
  const navigate = useNavigate();
  const onProjectClicked = (id) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    navigate(`/project/${id}`);
  };
  return (
    <div className="w-full md:pb-40 pb-24 px-4 md:mx-auto  lg:container">
      <div className="flex w-full pb-[40px] items-center text-[#00AF71]">
        <div className="w-1/2">
          <p className="text-[18px] font-bold montserrat_bold ">
            Popular Project{" "}
          </p>
        </div>
        <div className="w-1/2">
          <div className="float-right flex">
            <p className="mr-1">More</p>
            <img src={right} alt="" />
          </div>
        </div>
      </div>
      <div className="hidden sm:flex flex-row justify-start items-center space-x-12">
        {data?.map(
          (item, index) =>
            item?.logo && (
              <div
                key={index}
                className="flex flex-col space-y-4 max-w-[140px] cursor-pointer"
                onClick={() => {
                  onProjectClicked(item.id);
                }}
              >
                <img
                  className="rounded-lg w-[140px] h-[140px]"
                  src={item.logo}
                  alt="popular project"
                />
                <p className="w-full text-center sm:text-[16px] text-[12px] font-bold montserrat_bold text-ellipsis whitespace-nowrap overflow-hidden">
                  {item.name}
                </p>
              </div>
            )
        )}
      </div>
      <Swiper
        effect={"fade"}
        grabCursor={true}
        loop={true}
        spaceBetween={30}
        pagination={true}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          420: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper sm:hidden"
      >
        {data.map((val, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center space-y-4">
                <img
                  className="rounded-lg w-[140px] h-[140px]"
                  src={val.logo}
                  alt="popular project"
                />
                <p className="w-full text-center sm:text-[16px] text-[12px] font-bold montserrat_bold">
                  {val.name}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProjectMore;
