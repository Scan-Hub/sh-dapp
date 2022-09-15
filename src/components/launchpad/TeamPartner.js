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
import ControlledGridUploadImage from "../form/controlled_grid_upload";

const TeamPartner = ({
  className,
  register,
  reset,
  errors,
  setValue,
  control,
}) => {
  const listCountriesFlagDial = useSelector(selectcountriesFlagDial);
  return (
    <div
      className={`${
        className && className
      } px-6 pb-20 w-full flex flex-col space-y-[60px]`}
    >
      <div className="w-full flex flex-row">
        <div className="w-1/2 flex flex-col space-y-9">
          <span className="text-xl text-[#00AF71] font-montserrat_bold">
            Team Member
          </span>
          <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12">
            <div className="min-w-[364px] pt-3">
              <ControlledGridUploadImage
                name="vcs_portfolio_images"
                control={control}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col mt-15">
          <div className="flex flex-col space-y-6">
            <Input
              required
              reset={reset}
              register={register}
              name={"vcs_portfolio_project_name"}
              title={"Name"}
              placeholder={"Enter name"}
              // error={errors.vcs_portfolio_project_name}
            />
            <Input
              required
              reset={reset}
              register={register}
              name={"vcs_portfolio_website"}
              title={"Title"}
              placeholder={"Enter title"}
              // error={errors.vcs_portfolio_website}
            />
            <Input
              required
              reset={reset}
              register={register}
              name={"vcs_portfolio_website"}
              title={"Email"}
              placeholder={"Enter email"}
              // error={errors.vcs_portfolio_website}
            />
            {listCountriesFlagDial && (
              <SelectPhone
                // required
                className="mt-6"
                reset={reset}
                register={register}
                setValue={setValue}
                title={"Phone"}
                options={listCountriesFlagDial?.items}
                name={"vcs_description_phone"}
                placeholder={"Enter phone number"}
                // error={errors.vcs_description_phone}
                control={control}
              />
            )}
            <Input
              reset={reset}
              register={register}
              name={"vcs_portfolio_website"}
              title={"Linkedin"}
              placeholder={"Add Linkedin"}
              // error={errors.vcs_portfolio_website}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row">
        <div className="w-1/2 flex flex-col space-y-9">
          <span className="text-xl text-[#00AF71] font-montserrat_bold">
            Partners
          </span>
          <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12">
            <div className="min-w-[364px] pt-3">
              <ControlledGridUploadImage
                name="vcs_portfolio_images"
                control={control}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col mt-15">
          <div className="flex flex-col space-y-6">
            <Input
              required
              reset={reset}
              register={register}
              name={"vcs_portfolio_project_name"}
              title={"Name"}
              placeholder={"Enter name"}
              // error={errors.vcs_portfolio_project_name}
            />
            <Input
              required
              reset={reset}
              register={register}
              name={"vcs_portfolio_website"}
              title={"Website link"}
              placeholder={"Enter link"}
              // error={errors.vcs_portfolio_website}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPartner;
