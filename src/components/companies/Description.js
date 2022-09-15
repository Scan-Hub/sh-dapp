import React, { useCallback, useEffect, useState } from "react";

import { Input } from "../global/Input";
import SelectBox from "../global/SelectBox";
import {
  selectcountriesISO,
  selectcountriesFlagDial,
} from "../../reducers/countries.reducer";
import DatePickerComponent from "../global/DatePicker";
import UploadFile from "../global/UploadFile";
import { global } from "../../assets";
import { InputArea } from "../global/InputArea";
import UploadImage from "../global/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import InputCountry from "../partials/form/InputCountry";
import IcTelegram from "../../assets/images/profile/telegram.svg";
import IcTwitter from "../../assets/images/profile/twitter.svg";
import IcMedium from "../../assets/images/profile/medium.svg";
import IcDiscord from "../../assets/images/profile/discord_circle.svg";
import { Controller } from "react-hook-form";
import { randomKeyUUID } from "../../_helpers/utils/lib";
import CommunityField from "../partials/form/CommunityField";
import YupErrorMessage from "../global/YupErrorMessage";
import CommunityPlus from "../partials/form/CommunityPlus";
import SelectTagsField from "../global/SelectTagsField";
import { fetchFormTypes } from "../../actions/form.actions";
import { selectIndustry } from "../../reducers/form.reducer";
import PhoneField from "../partials/form/PhoneField";
const defaultCommunity = [
  {
    id: randomKeyUUID(),
    code: "twitter",
    link: "",
    iconLeft: IcTwitter,
    placeholder: "Add Twitter link",
    title: "Twitter",
  },
  {
    id: randomKeyUUID(),
    code: "telegram",
    link: "",
    iconLeft: IcTelegram,
    placeholder: "Add Telegram link",
    title: "Telegram",
  },
  {
    id: randomKeyUUID(),
    code: "discord",
    link: "",
    iconLeft: IcDiscord,
    placeholder: "Add Discord link",
    title: "Discord",
  },
  {
    id: randomKeyUUID(),
    code: "medium",
    link: "",
    iconLeft: IcMedium,
    placeholder: "Add Medium link",
    title: "Medium",
  },
];
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

  //Industry
  const listIndustry = useSelector(selectIndustry);

  const operatingStatus = [
    { id: "active", name: "Active" },
    { id: "close", name: "Close" },
  ];

  const otherCategorys = [
    { id: "Venture Capital", value: "Venture Capital" },
    { id: "Accelerator", value: "Accelerator" },
    { id: "Marketing Agency", value: "Marketing Agency" },
  ];

  const [communities, setCommunities] = useState(defaultCommunity);
  const onAddCommunity = (community) => {
    let newCommunity = [].concat(communities);
    newCommunity.push(community);
    setCommunities(newCommunity);
  };
  const onRemoveCommunity = (id) => {
    setCommunities(
      communities.filter((item) => {
        if (!item.id.includes(id)) {
          return true;
        }
        return false;
      })
    );
  };
  const pushCommunity = (item, value) => {
    let flag = false;
    communities.map((community) => {
      if (item.id === community.id) {
        community.link = value;
      }
      if (community.link) {
        flag = true;
      }
    });
    if (flag) {
      return communities;
    } else return [];
  };

  const dispatch = useDispatch();
  const onGetFormType = useCallback(() => {
    dispatch(fetchFormTypes());
  }, [dispatch]);

  useEffect(() => {
    onGetFormType();
  }, [onGetFormType]);
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
                <Controller
                  name={"phone"}
                  control={control}
                  rules={{ required: true }}
                  render={({ field, formState: { errors } }) => (
                    <div className="relative flex-col space-y-6">
                      <PhoneField
                        required
                        className="relative space-y-3"
                        title={"Phone"}
                        placeHolder={"Enter phone number"}
                        value={field.value?.phone}
                        onChange={(data, type) => {
                          if (type === "prefix") {
                            field.onChange({
                              target: {
                                name: "phone",
                                value: {
                                  ...field.value,
                                  code: data.code,
                                  prefix: data.dial_code,
                                },
                              },
                            });
                          }
                          if (type === "number") {
                            field.onChange({
                              target: {
                                name: "phone",
                                value: {
                                  ...field.value,
                                  number: data.number,
                                },
                              },
                            });
                          }
                        }}
                        error={errors?.phone?.number}
                      />
                    </div>
                  )}
                />
              )}
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
                  type="secure"
                  required
                  className="relative flex flex-col"
                  width={"214px"}
                  height={"214px"}
                  accept={"image/png, image/jpg, image/jpeg"}
                  uploadHint={"Upload your ID"}
                  recommendHint={"(.JPEG/ .JPG/ .PNG)"}
                  setValue={setValue}
                  name={"founder_ids1"}
                  error={errors.founder_ids1}
                />
                <UploadImage
                  type="secure"
                  required
                  className="relative flex flex-col"
                  width={"214px"}
                  height={"214px"}
                  accept={"image/png, image/jpg, image/jpeg"}
                  uploadHint={"Upload your ID"}
                  recommendHint={"(.JPEG/ .JPG/ .PNG)"}
                  setValue={setValue}
                  name={"founder_ids2"}
                  error={errors.founder_ids2}
                />
              </div>
            </div>
            <DatePickerComponent
              required
              className="vcs relative mt-6"
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
            <div className="mt-6 w-full space-y-6">
              <SelectTagsField
                required
                className={"w-full space-y-3"}
                title={"Industry"}
                data={listIndustry}
                name="industries"
                setValue={setValue}
                error={errors.industries}
              />
            </div>
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
          </div>
        </div>
        <Controller
          name={"community"}
          control={control}
          rules={{ required: true }}
          render={({ field, formState: { errors } }) => (
            <div className="relative flex-col space-y-6">
              <p className="sm:text-lg text-base font-semibold font-montserrat_semi_bold text-white sm:mt-12 mt-10">
                Community
              </p>
              <div className="flex flex-row items-start w-full mt-4 sm:space-x-8 space-x-3">
                <div className="w-full grid sm:grid-cols-2 grid-cols-1 sm:gap-x-8 sm:gap-y-7 gap-x-3 gap-y-2">
                  {communities.map((community, index) => (
                    <div key={index}>
                      <CommunityField
                        index={index}
                        community={community}
                        onChange={(e) => {
                          field.onChange(
                            pushCommunity(community, e.target.value)
                          );
                        }}
                        onRemoveCommunity={onRemoveCommunity}
                      />
                    </div>
                  ))}
                </div>
                <CommunityPlus onAddCommunity={onAddCommunity} />
              </div>
              {errors?.community && (
                <YupErrorMessage message={errors?.community?.message} />
              )}
            </div>
          )}
        />

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
