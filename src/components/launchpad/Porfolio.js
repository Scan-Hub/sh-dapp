import React, { useState } from "react";

import { Input } from "../global/Input";
import SelectTags from "../global/SelectTags";
import SelectBox from "../global/SelectBox";
import {
  selectcountriesISO,
  selectcountriesFlagDial,
} from "../../reducers/countries.reducer";
import SelectPhone from "../global/SelectPhone";
import DatePickerComponent from "../global/DatePicker";
import UploadFile from "../global/UploadFile";
import CheckBoxGroup from "../global/CheckBoxGroup";
import { global } from "../../assets";
import { InputArea } from "../global/InputArea";
import UploadImage from "../global/UploadImage";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useFieldArray } from "react-hook-form";
import ControlledGridUploadImage from "../global/ControlledGridUploadImage";

const Porfolio = ({
  className,
  register,
  reset,
  errors,
  setValue,
  control,
}) => {
  const projectStatus = [
    { id: 1, name: "Progress" },
    { id: 2, name: "Complate" },
  ];
  return (
    <div className={`${className && className} px-6 pb-20 w-full`}>
      <div className="w-full">
        <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12">
          <div className="w-1/2">
            <Input
              required
              reset={reset}
              register={register}
              name={"vcs_portfolio_investment"}
              title={"Number of TGEs"}
              placeholder={"Enter number"}
              error={errors.vcs_portfolio_investment}
            />
          </div>

          <div className="w-1/2">
            <Input
              required
              reset={reset}
              register={register}
              name={"vcs_portfolio_fund_amount"}
              title={"Total Fund Raise"}
              placeholder={"$ 1 000 000"}
              error={errors.vcs_portfolio_fund_amount}
            />
          </div>
        </div>
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
                <SelectBox
                  type={"jsonArr"}
                  required
                  className={"mt-6"}
                  reset={reset}
                  register={register}
                  setValue={setValue}
                  title={"Operating Status"}
                  options={projectStatus}
                  name={"vcs_description_operating_status"}
                  placeholder={"Select"}
                  error={errors.vcs_description_operating_status}
                  control={control}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Porfolio;
