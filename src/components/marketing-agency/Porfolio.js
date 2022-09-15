import React from "react";

import { Input } from "../global/Input";
import { global } from "../../assets";
import ControlledGridUploadImage from "../global/ControlledGridUploadImage";

const Porfolio = ({
  className,
  register,
  reset,
  errors,
  setValue,
  control,
}) => {
  return (
    <div className={`${className && className} px-6 pb-20 w-full`}>
      <div className="w-full">
        <div className="flex flex-col space-y-9 mt-8">
          <span className="text-xl text-[#00AF71] font-montserrat_bold">
            Portfolio
          </span>
          <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12">
            <div className="min-w-[364px] pt-3">
              <ControlledGridUploadImage
                name="vcs_portfolio_images"
                control={control}
              />
            </div>

            <div className="w-3/5 flex flex-col space-y-6">
              <Input
                required
                reset={reset}
                register={register}
                name={"vcs_portfolio_project_name"}
                title={"Project name"}
                placeholder={"Enter name"}
                error={errors.vcs_portfolio_project_name}
              />
              <Input
                required
                reset={reset}
                register={register}
                name={"vcs_portfolio_website"}
                title={"Website"}
                placeholder={"Enter link"}
                error={errors.vcs_portfolio_website}
              />
              <div className="flex flex-col sm:mt-12 mt-10 ">
                <span className="font-montserrat_semi_bold text-lg text-white">
                  Social Media
                  <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
                    *
                  </span>
                </span>
                <div className="flex flex-row w-full mt-3 items-center space-x-4">
                  <Input
                    reset={reset}
                    register={register}
                    name={"vcs_portfolio_twitter"}
                    iconLeft={global.IcTwitter}
                    placeholder={"Add Twitter link"}
                    error={errors.vcs_portfolio_twitter}
                  />
                  <Input
                    reset={reset}
                    register={register}
                    name={"vcs_portfolio_telegram"}
                    iconLeft={global.IcTelegram}
                    placeholder={"Add Telegram link"}
                    error={errors.vcs_portfolio_telegram}
                  />
                  <div className="flex justify-center items-center min-w-[48px] w-12 h-12 bg-[#191B2A] rounded-lg cursor-pointer">
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Porfolio;
