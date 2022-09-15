import React from "react";

import { Input } from "../global/Input";
import PortfolioGridUpload from "./PortfolioGridUpload";

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
              name={"total_number_of_investment"}
              title={"Number of Investment"}
              placeholder={"Enter number"}
              error={errors.total_number_of_investment}
            />
          </div>

          <div className="w-1/2">
            <Input
              required
              reset={reset}
              register={register}
              name={"total_funding_amount"}
              title={"Total Fund Amount"}
              placeholder={"$ 1 000 000"}
              error={errors.total_funding_amount}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-9 mt-8">
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
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
