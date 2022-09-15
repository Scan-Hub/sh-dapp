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

const Description = ({
  className,
  register,
  reset,
  errors,
  setValue,
  control,
}) => {
  const listCountriesISO = useSelector(selectcountriesISO);

  //Sector of investment
  const sectorData = [
    { id: "Decentralized Finance", text: "Decentralized Finance" },
    { id: "GameFi", text: "GameFi" },
    { id: "Metaverse", text: "Metaverse" },
    { id: "Exchange", text: "Exchange" },
    { id: "Fintech", text: "Fintech" },
    { id: "Nfts", text: "Nfts" },
    { id: "Media", text: "Media" },
    { id: "Lending", text: "Lending" },
    { id: "Borrow", text: "Borrow" },
  ];

  //Stage of Investment
  const stageData = [
    { id: "Decentralized Finance", text: "Decentralized Finance" },
    { id: "GameFi", text: "GameFi" },
    { id: "Metaverse", text: "Metaverse" },
    { id: "Exchange", text: "Exchange" },
    { id: "Fintech", text: "Fintech" },
    { id: "Nfts", text: "Nfts" },
    { id: "Media", text: "Media" },
    { id: "Lending", text: "Lending" },
    { id: "Borrow", text: "Borrow" },
  ];

  const operatingStatus = [
    { id: 1, name: "Active" },
    { id: 2, name: "Close" },
  ];

  return (
    <div className={`${className && className} px-6 pb-20 w-full`}>
      <div className="w-full">
        <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12 sm:space-y-0 space-y-4">
          <div className="w-1/2">
            <UploadImage
              required
              className="flex flex-col"
              width={"214px"}
              height={"214px"}
              title={"Upload file:"}
              accept={"image/png, image/jpg, image/jpeg, image/gif"}
              uploadHint={"Add your logo here"}
              recommendHint={"(.JPEG/ .JPG/ .PNG Size: 480 x 480 (px) - 2MB )"}
              setValue={setValue}
              name={"vcs_description_upload_logo"}
              error={errors.vcs_description_upload_logo}
            />
            <div className="flex flex-col mt-6 space-y-6">
              <Input
                required
                reset={reset}
                register={register}
                name={"vcs_description_company_name"}
                title={"Company name"}
                placeholder={"Enter company name"}
                error={errors.vcs_description_company_name}
              />
              <Input
                required
                reset={reset}
                register={register}
                name={"vcs_description_website"}
                title={"Website"}
                placeholder={"Enter website"}
                error={errors.vcs_description_website}
              />
              {listCountriesISO && (
                <SelectBox
                  type={"jsonArr"}
                  required
                  reset={reset}
                  register={register}
                  setValue={setValue}
                  title={"Country"}
                  options={listCountriesISO?.items}
                  name={"vcs_description_country"}
                  placeholder={"Enter country"}
                  error={errors.vcs_description_country}
                  control={control}
                />
              )}
              <Input
                required
                reset={reset}
                register={register}
                name={"vcs_description_location"}
                title={"Location"}
                placeholder={"Enter location"}
                error={errors.vcs_description_location}
              />
              <Input
                reset={reset}
                register={register}
                name={"vcs_description_email"}
                title={"Whitepaper"}
                placeholder={"Enter email"}
                error={errors.vcs_description_email}
              />
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
                  className="flex flex-col"
                  width={"214px"}
                  height={"214px"}
                  accept={"image/png, image/jpg, image/jpeg"}
                  uploadHint={"Upload your ID"}
                  recommendHint={"(.JPEG/ .JPG/ .PNG)"}
                  setValue={setValue}
                  name={"vcs_description_upload_id_front"}
                  error={errors.vcs_description_upload_id_front}
                />
                <UploadImage
                  required
                  className="flex flex-col"
                  width={"214px"}
                  height={"214px"}
                  accept={"image/png, image/jpg, image/jpeg"}
                  uploadHint={"Upload your ID"}
                  recommendHint={"(.JPEG/ .JPG/ .PNG)"}
                  setValue={setValue}
                  name={"vcs_description_upload_id_back"}
                  error={errors.vcs_description_upload_id_back}
                />
              </div>
            </div>
            <DatePickerComponent
              required
              className="mt-6"
              reset={reset}
              register={register}
              setValue={setValue}
              title={"Founded Date"}
              name={"vcs_description_founded_date"}
              placeholder={"Choose a date"}
              error={errors.vcs_description_founded_date}
              control={control}
            />
            <SelectTags
              required
              className={"mt-6 space-y-3"}
              title={"Project Category"}
              data={sectorData}
              name="vcs_description_sector"
              setValue={setValue}
              error={errors.vcs_description_sector}
            />
            <SelectTags
              required
              className={"mt-6 space-y-3"}
              title={"Platform"}
              data={stageData}
              name="vcs_description_stage"
              setValue={setValue}
              error={errors.vcs_description_stage}
            />
            <SelectTags
              required
              className={"mt-6 space-y-3"}
              title={"Lauching sector"}
              data={sectorData}
              name="vcs_description_sector"
              setValue={setValue}
              error={errors.vcs_description_sector}
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
              name={"vcs_description_operating_status"}
              placeholder={"Select"}
              error={errors.vcs_description_operating_status}
              control={control}
            />
          </div>
        </div>
        <div className="sm:mt-12 mt-10 flex flex-row w-full items-end space-x-4">
          <Input
            reset={reset}
            register={register}
            name={"vcs_description_twitter"}
            iconLeft={global.IcTwitter}
            title={"Community"}
            placeholder={"Add Twitter link"}
            error={errors.vcs_description_twitter}
          />
          <Input
            reset={reset}
            register={register}
            name={"vcs_description_telegram"}
            iconLeft={global.IcTelegram}
            placeholder={"Add Telegram link"}
            error={errors.vcs_description_telegram}
          />
          <Input
            reset={reset}
            register={register}
            name={"vcs_description_discord"}
            iconLeft={global.IcDiscord}
            placeholder={"Add Discord link"}
            error={errors.vcs_description_discord}
          />
          <Input
            reset={reset}
            register={register}
            name={"vcs_description_medium"}
            iconLeft={global.IcMedium}
            placeholder={"Add Medium link"}
            error={errors.vcs_description_medium}
          />
          <div className="flex justify-center items-center min-w-[48px] w-12 h-12 bg-[#191B2A] rounded-lg cursor-pointer">
            +
          </div>
        </div>

        <InputArea
          required
          className={"mt-15"}
          reset={reset}
          register={register}
          name={"vcs_description_about_company"}
          title={"About Company (2000 words)"}
          placeholder={"Enter text"}
          error={errors.vcs_description_about_company}
        />
      </div>
    </div>
  );
};

export default Description;
