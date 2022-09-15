import React, { useState } from "react";
import arrowupgreen from "../../assets/images/project/project_icon/arrow-upgreen.svg";
import shield from "../../assets/images/project/project_icon/shield.png";
import Sumary from "../reports/Sumary";
import StarRatings from "react-star-ratings";

const Projecthead = ({ fullDetailForm }) => {
  const [rating, setRating] = useState(3);
  const changeRating = (rateNumber) => {
    setRating(rateNumber);
  };

  return (
    <div className="flex-row xl:flex relative md:mx-auto lg:container px-4">
      <div className="xl:w-[70%] w-full relative rounded-[32px] bg-[#191B2A]">
        <Sumary data={fullDetailForm.items} />
      </div>
      <div className="xl:w-[30%] xl:ml-[23px] xl:mt-0 mt-8 w-full p-8 bg-[#191B2A] rounded-[32px] h-fit ">
        <div className="font-semibold pb-2  text-[18px]">Status</div>
        <div className="flex items-center w-full py-6 border-b border-dashed border-[#656881]  sm:text-[16px] text-[12px]">
          <p className="font-montserrat_semi_bold w-1/2 sm:text-[16px] text-[#656881]">
            KYC Verified:
          </p>
          <div className="flex font-bold w-1/2 justify-end ">
            {fullDetailForm?.items?.kyc ? (
              <a
                className="rounded-[32px] bg-[#00AF71] w-fit flex items-center p-[6px_12px] cursor-pointer"
                href={fullDetailForm?.items?.kyc_image}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={shield} alt="KYC Verified" />
                <p className="ml-2 font-bold  montserrat_semi_bold whitespace-nowrap">
                  KYC Verified
                </p>
              </a>
            ) : (
              <p className="font-montserrat_bold text-base text-white">
                Not KYC Verified
              </p>
            )}
          </div>
        </div>
        <div className="py-5 flex items-center border-b border-dashed border-[#656881]  sm:text-[16px] text-[12px]">
          <p className="font-montserrat_semi_bold w-full text-[16px] text-[#656881]">
            Listing Status:
          </p>
          <div className="flex font-bold p-2 justify-end items-center w-full ">
            {fullDetailForm?.items?.listing_status ? (
              <p className="ml-2 p-[6px_12px] rounded-[32px] bg-[#00AF71] text-white">
                LISTED
              </p>
            ) : (
              "-"
            )}
          </div>
        </div>
        <div className="py-5 flex items-center border-b border-dashed border-[#656881]  sm:text-[16px] text-[12px]">
          <p className="font-montserrat_semi_bold w-full text-[#656881]">
            Launch:
          </p>
          <div className="flex font-bold p-2 justify-end  w-full ">
            <p className="ml-2">August 31 2022</p>
          </div>
        </div>
        <div className="py-5 flex items-center border-b border-dashed border-[#656881]  sm:text-[16px] text-[12px]">
          <p className="font-montserrat_semi_bold w-full text-[#656881]">
            Votes:
          </p>
          <div className="flex font-bold p-2 justify-end  w-full ">
            <p className="ml-2">
              {fullDetailForm?.items?.total_vote
                ? fullDetailForm.items.total_vote
                : "-"}
            </p>
          </div>
        </div>
        <div className="py-5 flex items-center border-b border-dashed border-[#656881]  sm:text-[16px] text-[12px]">
          <p className="font-montserrat_semi_bold w-full text-[#656881]">
            Votes Today:
          </p>
          <div className="flex font-bold p-2 justify-end  w-full ">
            <img className="mr-1" src={arrowupgreen} alt="Vote" />
            <p className="ml-2 text-[#A0D911]">
              {fullDetailForm?.items?.vote_24h
                ? fullDetailForm.items.vote_24h
                : "-"}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-8 space-y-4">
          <span className="font-montserrat_bold text-white text-lg">Vote</span>
          <StarRatings
            rating={rating}
            starRatedColor="#E26B45"
            starEmptyColor="#656881"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
            starSpacing="7px"
          />
        </div>
      </div>
    </div>
  );
};

export default Projecthead;
