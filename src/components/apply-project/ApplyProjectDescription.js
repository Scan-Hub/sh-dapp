import React, { useState } from "react";
import { Input } from "../global/Input";
import IcCloudComputing from "../../assets/images/profile/cloud-computing.svg";
import IcTelegram from "../../assets/images/profile/telegram.svg";
import IcTwitter from "../../assets/images/profile/twitter.svg";
import IcMedium from "../../assets/images/profile/medium.svg";
import IcDiscord from "../../assets/images/profile/discord_circle.svg";
import AboutProject from "./AboutProject";
import CommunityPlus from "../global/CommunityPlus";
import BasicInformation from "./BasicInformation";
import { Controller } from "react-hook-form";
import CommunityField from "../partials/form/CommunityField";
import { randomKeyUUID } from "../../_helpers/utils/lib";
import UploadImage from "../global/UploadImage";

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

const ApplyProjectDescription = ({
  className,
  errors,
  register,
  reset,
  setValue,
  control,
}) => {
  const [communityList, setCommunityList] = useState(defaultCommunity);

  const [nameFileRoadmap, setNameFileRoadmap] = useState("");

  const onAddCommunity = (community) => {
    let newCommunity = [].concat(communityList);
    newCommunity.push(community);
    setCommunityList(newCommunity);
  };

  const onRemoveCommunity = (id) => {
    setCommunityList(
      communityList.filter((item) => {
        if (!item.id.includes(id)) {
          return true;
        }
        return false;
      })
    );
  };
  const pushCommunity = (item, value) => {
    let flag = false;
    communityList.map((community) => {
      if (item.id === community.id) {
        community.link = value;
      }
      if (community.link) {
        flag = true;
      }
    });
    if (flag) {
      return communityList;
    } else return [];
  };

  return (
    <div className={`${className && className} px-6 pb-20 w-full`}>
      <div className="w-full">
        <p className="sm:text-3xl text-xl font-montserrat_semi_bold font-bold text-green-text-profile">
          Project application
        </p>
        <div className="flex sm:flex-row items-center flex-col mt-4 w-full sm:space-x-12 sm:space-y-0 space-y-4">
          <UploadImage
            className="flex flex-col relative"
            width={"320px"}
            height={"320px"}
            accept={"image/png, image/jpg, image/jpeg, image/gif"}
            uploadHint={"Add your logo here"}
            recommendHint={"(.JPEG/ .JPG/ .PNG Size: 480 x 480 (px) - 2MB )"}
            setValue={setValue}
            name={"project_logo"}
            error={errors?.project_logo}
          />
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full">
              <Input
                required
                reset={reset}
                register={register}
                name={"project_name"}
                title={`Project name`}
                placeholder={"Enter project name"}
                error={errors.project_name}
              />
            </div>
            <div className="sm:mt-12 mt-10 flex flex-row w-full sm:space-x-12 space-x-6">
              <Input
                reset={reset}
                register={register}
                name={"project_web"}
                title={"Website"}
                placeholder={"Enter link"}
                error={errors.project_web}
              />
              <Input
                reset={reset}
                register={register}
                name={"whitepaper"}
                title={"Whitepaper"}
                placeholder={"Add link"}
                error={errors.whitepaper}
              />
            </div>
            <div className="sm:mt-12 mt-10 flex flex-row w-full items-end sm:space-x-12 space-x-6">
              <Input
                reset={reset}
                register={register}
                name={"source_code"}
                title={"Source Code"}
                placeholder={"Add link"}
                error={errors.source_code}
              />
              <div className="w-full">
                <p className="sm:text-lg text-base font-semibold font-montserrat_semi_bold text-white">
                  Roadmap
                </p>
                <div className="w-full flex flex-row items-center space-x-6 mt-4">
                  <div className="flex flex-2">
                    <p className="sm:text-base text-sm text-white font-montserrat_medium font-medium ml-[2px]">
                      Upload file:
                    </p>
                  </div>
                  {nameFileRoadmap ? (
                    <>
                      <p className="text-base text-white font-montserrat_medium overflow-hidden truncate sm:w-[260px] w-[70px] sm:py-3 py-1 sm:px-5 px-2">
                        {nameFileRoadmap}
                      </p>
                      <button
                        type="button"
                        className="sm:text-sm text-xs text-red-500"
                        onClick={() => setNameFileRoadmap("")}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <label className="flex flex-row items-center sm:text-base text-sm font-montserrat text-white border-[1px] border-text-des rounded-lg sm:py-3 py-1 sm:px-5 px-2 cursor-pointer">
                      <img
                        src={IcCloudComputing}
                        alt="upload"
                        className="sm:w-6 w-5 sm:mr-3 mr-2"
                      />
                      Choose PDF file to upload
                      <input
                        type="file"
                        name="myImage"
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) => {
                          setNameFileRoadmap(e.target.value);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Controller
          name={"communities"}
          control={control}
          rules={{ required: true }}
          render={({ field, formState: { errors } }) => {
            return (
              <div className="relative flex-col space-y-6">
                <p className="sm:text-lg text-base font-semibold font-montserrat_semi_bold text-white sm:mt-12 mt-10">
                  Community
                </p>
                <div className="flex flex-row items-start w-full mt-4 sm:space-x-8 space-x-3">
                  <div className="w-full grid sm:grid-cols-4 grid-cols-2 sm:gap-x-8 sm:gap-y-7 gap-x-3 gap-y-2">
                    {communityList.map((community, index) => {
                      return (
                        <div key={index}>
                          <CommunityField
                            name={"communities"}
                            community={community}
                            onChange={(e) => {
                              field.onChange(
                                pushCommunity(community, e.target.value)
                              );
                            }}
                            error={
                              errors?.communities &&
                              errors.communities[index]?.link
                            }
                            onRemoveCommunity={onRemoveCommunity}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <CommunityPlus onAddCommunity={onAddCommunity} />
                </div>
              </div>
            );
          }}
        />
        <BasicInformation
          reset={reset}
          errors={errors}
          control={control}
          register={register}
          setValue={setValue}
        />
        <div className="sm:mt-20 mt-12">
          <AboutProject name={"about_projects"} control={control} />
        </div>
      </div>
    </div>
  );
};

export default ApplyProjectDescription;
