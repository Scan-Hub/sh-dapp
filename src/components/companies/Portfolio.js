import React from "react";

import { Input } from "../global/Input";
import { global } from "../../assets";
import ControlledGridUploadImage from "../global/ControlledGridUploadImage";
import PortfolioGridUpload from "./PortfolioGridUpload";
import YupErrorMessage from "../global/YupErrorMessage";

const Portfolio = ({
  className,
  register,
  reset,
  errors,
  setValue,
  control,
  trigger,
  watch,
}) => {
  return (
    <div className={`${className && className} px-6 pb-20 w-full`}>
      <div className="w-full">
        <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12">
          <div className="w-1/2">
            <Input
              required
              reset={reset}
              register={register}
              name={"number_of_investment_received"}
              title={"Number of Investment Received"}
              placeholder={"Enter number"}
              error={errors.number_of_investment_received}
            />
          </div>

          <div className="w-1/2">
            <Input
              required
              reset={reset}
              register={register}
              name={"total_fund_received"}
              title={"Total Fund Received"}
              placeholder={"$ 1 000 000"}
              error={errors.total_fund_received}
            />
          </div>
        </div>
        <div className="relative flex flex-col space-y-9 mt-8">
          <span className="text-xl text-[#00AF71] font-montserrat_bold">
            Portfolio
          </span>
          <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12">
            <div className="w-full pt-3">
              <PortfolioGridUpload
                name="portfolios"
                reset={reset}
                register={register}
                control={control}
                trigger={trigger}
                setValue={setValue}
                error={errors}
              />
            </div>
          </div>
          {errors?.portfolios && (
            <YupErrorMessage message={errors?.portfolios?.message} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
