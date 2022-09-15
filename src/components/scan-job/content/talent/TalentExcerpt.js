import { FixedNumber } from "ethers";
import React from "react";
import Button from "../../../global/Button";
import StarRating from "../../../global/StarRating";

const TalentExcerpt = ({ data }) => {
  const { name, avatar, rated, reviews, salary, experiences, overview } = data;
  const hire = () => {
    // TODO: Hire this candidate
  };
  return (
    <div
      className="flex flex-row flex-wrap w-full pl-4 pr-8 py-4 gap-6 bg-box-bg rounded-lg"
      style={{
        boxShadow:
          "0px 10px 15px rgba(96, 111, 134, 0.11), 0px 4px 6px rgba(96, 111, 134, 0.02)",
      }}
    >
      <img src={avatar} className="w-[100px] h-[100px]" alt={name} />
      <div className="flex flex-1 flex-col h-full gap-4">
        <div className="flex flex-row gap-4">
          <p className="flex flex-grow text-xl font-poppins_semi_bold text-grey-1">
            {name}
          </p>
          <Button
            title="Hire Me"
            onClickBtn={hire}
            className="w-[128px] px-[16px] py-[6px] rounded-[32px]"
          />
        </div>
        <div className="flex flex-row gap-[32px]">
          <div className="flex flex-row gap-[8px]">
            <p className="bg-orange p-[3px] font-poppins_bold text-base rounded">
              {FixedNumber.from(rated).toString()}
            </p>
            <StarRating size="20px" spacing="2px" value={rated} />
          </div>
          <p className="text-secondary font-poppins_medium text-[16px]">
            {reviews} reviews
          </p>
          <p className="text-sh_yellow font-poppins_medium text-[16px]">
            {salary}
          </p>
        </div>
        <p className="text-primary font-montserrat_bold text-[16px]">{experiences}</p>
        <p className="text-text-des font-montserrat text-[16px]">{overview}</p>
      </div>
    </div>
  );
};

export default React.memo(TalentExcerpt);
