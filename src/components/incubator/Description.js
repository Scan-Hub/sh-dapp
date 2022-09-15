import React from "react";

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
import InputCountry from "../partials/form/InputCountry";

const Description = ({
  className,
  register,
  reset,
  errors,
  setValue,
  control,
}) => {
  const listCountriesISO = useSelector(selectcountriesISO);
  const listCountriesFlagDial = useSelector(selectcountriesFlagDial);

  const employeesNumbers = [
    { id: 50, name: "Less than 50" },
    { id: 51, name: "51 to 200" },
    { id: 201, name: "201 to 1000" },
    { id: 1001, name: "1001 to 5000" },
    { id: 5000, name: "More than 5000" },
  ];

  //Sector of investment
  const sectorData = [
    "Decentralized Finance",
    "GameFi",
    "Metaverse",
    "Exchange",
    "Fintech",
    "Nfts",
    "Media",
    "Lending",
    "Borrow",
  ];

  //Stage of Investment
  const stageData = [
    "Decentralized Finance",
    "GameFi",
    "Metaverse",
    "Exchange",
    "Fintech",
    "Nfts",
    "Media",
    "Lending",
    "Borrow",
  ];

  const operatingStatus = [
    { id: "active", name: "Active" },
    { id: "close", name: "Close" },
  ];

  const otherCategorys = [
    { id: "Venture Capital", value: "Venture Capital" },
    { id: "Accelerator", value: "Accelerator" },
    { id: "Marketing Agency", value: "Marketing Agency" },
  ];

  return (
    <div className={`${className && className} px-6 pb-20 w-full`}>
      <div className="w-full">
        <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12 sm:space-y-0 space-y-4">
          <div className="w-1/2">
            <UploadImage
              required
              className="relative flex flex-col"
              width={"214px"}
              height={"214px"}
              title={"Upload file:"}
              accept={"image/png, image/jpg, image/jpeg, image/gif"}
              uploadHint={"Add your logo here"}
              recommendHint={"(.JPEG/ .JPG/ .PNG Size: 480 x 480 (px) - 2MB )"}
              setValue={setValue}
              name={"logo"}
              error={errors.logo}
            />
            <div className="flex flex-col mt-6 space-y-6">
              <Input
                required
                reset={reset}
                register={register}
                name={"name"}
                title={"Company name"}
                placeholder={"Enter company name"}
                error={errors.name}
              />
              <Input
                required
                reset={reset}
                register={register}
                name={"website"}
                title={"Website"}
                placeholder={"Enter website"}
                error={errors.website}
              />
              {listCountriesISO && (
                <InputCountry
                  required
                  reset={reset}
                  register={register}
                  setValue={setValue}
                  title={"Country"}
                  options={listCountriesISO?.items}
                  name={"country"}
                  placeholder={"Enter country"}
                  error={errors.country}
                  control={control}
                />
              )}
              <Input
                required
                reset={reset}
                register={register}
                name={"location"}
                title={"Location"}
                placeholder={"Enter location"}
                error={errors.location}
              />
              <Input
                required
                reset={reset}
                register={register}
                name={"email"}
                title={"Email"}
                placeholder={"Enter email"}
                error={errors.email}
              />
              {listCountriesFlagDial && (
                <SelectPhone
                  // required
                  className="relative mt-6"
                  reset={reset}
                  register={register}
                  setValue={setValue}
                  title={"Phone"}
                  options={listCountriesFlagDial?.items}
                  name={"phone"}
                  placeholder={"Enter phone number"}
                  error={errors.phone}
                  control={control}
                />
              )}
              <DatePickerComponent
                required
                className="relative mt-6"
                reset={reset}
                register={register}
                setValue={setValue}
                title={"Date"}
                name={"description_date"}
                placeholder={"Choose a date"}
                error={errors.description_date}
                control={control}
              />
              <div className="mt-6">
                <span className="font-montserrat_semi_bold text-lg text-white">
                  Bussiness registration certificate
                  <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
                    *
                  </span>
                </span>
                <UploadFile
                  className="relative flex flex-col mt-3"
                  title={"Upload file:"}
                  uploadHint={"Choose file to upload "}
                  recommendHint={"(Recommend PDF file)"}
                  accept={"application/pdf"}
                  setValue={setValue}
                  name={"business_registration_certificate"}
                  error={errors.business_registration_certificate}
                />
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-[6px] mb-3">
                <span className="font-montserrat_semi_bold text-lg text-white">
                  Founder ID
                </span>
                <img src={global.IcInfoCircle} alt="Founder ID" />
              </div>

              <div className="flex flex-row space-x-4">
                <UploadImage
                  required
                  className="relative flex flex-col"
                  width={"214px"}
                  height={"214px"}
                  accept={"image/png, image/jpg, image/jpeg"}
                  uploadHint={"Upload your ID"}
                  recommendHint={"(.JPEG/ .JPG/ .PNG)"}
                  setValue={setValue}
                  name={"description_upload_id_front"}
                  error={errors.description_upload_id_front}
                />
                <UploadImage
                  required
                  className="relative flex flex-col"
                  width={"214px"}
                  height={"214px"}
                  accept={"image/png, image/jpg, image/jpeg"}
                  uploadHint={"Upload your ID"}
                  recommendHint={"(.JPEG/ .JPG/ .PNG)"}
                  setValue={setValue}
                  name={"description_upload_id_back"}
                  error={errors.description_upload_id_back}
                />
              </div>
            </div>
            <DatePickerComponent
              required
              className="relative mt-6"
              reset={reset}
              register={register}
              setValue={setValue}
              title={"Founded Date"}
              name={"founded_date"}
              placeholder={"Choose a date"}
              error={errors.founded_date}
              control={control}
            />
            <SelectBox
              type={"jsonArr"}
              required
              className={"mt-6"}
              reset={reset}
              register={register}
              setValue={setValue}
              title={"Number of employees"}
              options={employeesNumbers}
              name={"number_of_employees"}
              placeholder={"Select"}
              error={errors.number_of_employees}
              control={control}
            />
            <SelectTags
              required
              className={"mt-6 space-y-3"}
              title={"Sector of incubation"}
              data={sectorData}
              name="sectors_of_investment"
              setValue={setValue}
              error={errors.sectors_of_investment}
            />
            <SelectTags
              required
              className={"mt-6 space-y-3"}
              title={"Stage of Incubation"}
              data={stageData}
              name="stage_of_investment"
              setValue={setValue}
              error={errors.stage_of_investment}
            />
            <SelectBox
              type={"jsonArr"}
              required
              className={"mt-6"}
              reset={reset}
              register={register}
              setValue={setValue}
              title={"Operating Status"}
              options={operatingStatus}
              name={"operating_status"}
              placeholder={"Select"}
              error={errors.operating_status}
              control={control}
            />
            <CheckBoxGroup
              className={"mt-6 space-y-3"}
              classNameContent={"space-y-7"}
              title={"Other Category"}
              data={otherCategorys}
              name="description_other_category"
              setValue={setValue}
              error={errors.description_other_category}
            />
          </div>
        </div>
        <div className="sm:mt-12 mt-10 flex flex-row w-full items-end space-x-4">
          <Input
            reset={reset}
            register={register}
            name={"description_twitter"}
            iconLeft={global.IcTwitter}
            title={"Community"}
            placeholder={"Add Twitter link"}
            error={errors.description_twitter}
          />
          <Input
            reset={reset}
            register={register}
            name={"description_telegram"}
            iconLeft={global.IcTelegram}
            placeholder={"Add Telegram link"}
            error={errors.description_telegram}
          />
          <Input
            reset={reset}
            register={register}
            name={"description_discord"}
            iconLeft={global.IcDiscord}
            placeholder={"Add Discord link"}
            error={errors.description_discord}
          />
          <Input
            reset={reset}
            register={register}
            name={"description_medium"}
            iconLeft={global.IcMedium}
            placeholder={"Add Medium link"}
            error={errors.description_medium}
          />
          <div className="flex justify-center items-center min-w-[48px] w-12 h-12 bg-[#191B2A] rounded-lg cursor-pointer">
            +
          </div>
        </div>

        <InputArea
          required
          className={"relative mt-15"}
          reset={reset}
          register={register}
          name={"about_company"}
          title={"About Company (2000 words)"}
          placeholder={"Enter text"}
          error={errors.about_company}
        />
      </div>
    </div>
  );
};

export default Description;
