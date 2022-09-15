import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SwitchButton from "../components/global/SwitchButton";
import { applyProjectSchema } from "../_helpers/utils/schema";
import ApplyProjectTeamAndPartner from "../components/apply-project/ApplyProjectTeamAndPartner";
import ApplyProjectDescription from "../components/apply-project/ApplyProjectDescription";
import { formatTimeStamp } from "../_helpers/lib";
import { submitApplyProject } from "../actions/form.actions";
import { openModalSubmitForm } from "../reducers/form.reducer";
import { randomKeyUUID } from "../_helpers/utils/lib";
import IcTelegram from "../assets/images/profile/telegram.svg";
import IcTwitter from "../assets/images/profile/twitter.svg";
import IcMedium from "../assets/images/profile/medium.svg";
import IcDiscord from "../assets/images/profile/discord_circle.svg";

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

const initValues = {
  launching_date: "",
  smart_contracts: [{ chain: "", contract: "" }],
  about_projects: [
    { title: "Highlights", description: "" },
    { title: "Description", description: "" },
  ],
  communities: defaultCommunity,
};

const ApplyProjectPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applyProjectSchema),
    defaultValues: initValues,
  });

  const [index, setIndex] = useState(0);

  const onChangeIndex = useCallback((index) => {
    setIndex(index);
  }, []);

  const handlerCommunity = (communities) => {
    let newCommunities = [];
    const filterCommunities = communities.filter((e) => e.link !== "");
    filterCommunities.forEach((community) => {
      newCommunities.push({ link: community.link, type: community.code });
    });
    return newCommunities;
  };

  const onSubmit = async (data) => {
    const dataBody = { ...data };
    await dispatch(
      submitApplyProject({
        project_name: dataBody.project_name,
        project_logo: dataBody.project_logo ? dataBody.project_logo : "",
        project_website: dataBody.project_web ? dataBody.project_web : "",
        white_paper: dataBody.whitepaper ? dataBody.whitepaper : "",
        source_code: dataBody.source_code ? dataBody.source_code : "",
        road_map: dataBody.road_map ? dataBody.road_map : "",
        //objects
        communities: dataBody.communities
          ? handlerCommunity(dataBody.communities)
          : undefined,
        category_type:
          dataBody?.category_type_sector && dataBody.category_type_sector,
        audit_company:
          dataBody?.audit_company_sector && dataBody.audit_company_sector,
        listing_status: dataBody.listing_status === "Yes" ? true : false,
        token_name: dataBody.token_symbol ? dataBody.token_symbol : "",
        //float
        launching_date:
          dataBody.launching_date && formatTimeStamp(dataBody?.launching_date),
        smart_contracts: dataBody?.smart_contracts
          ? dataBody.smart_contracts.filter((e) => e.chain !== "")
          : undefined,
        project_high_light: dataBody.about_projects[0].description,
        project_description: dataBody.about_projects[1].description,
        about_projects: dataBody?.about_projects.filter(
          (e) =>
            e.title !== "undefined" &&
            e.title !== "Highlights" &&
            e.title !== "Description"
        ),
        teams:
          dataBody?.apply_project_team_members.filter(
            (e) => e.profile_picture !== undefined
          ).length > 0
            ? dataBody?.apply_project_team_members.filter(
                (e) => e.profile_picture !== undefined
              )
            : [],
        partner:
          dataBody?.apply_project_partners.filter((e) => e.logo !== undefined)
            .length > 0
            ? dataBody?.apply_project_partners.filter(
                (e) => e.logo !== undefined
              )
            : [],
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        const { data } = originalPromiseResult;
        if (data) {
          dispatch(openModalSubmitForm({ isOpen: true }));
        }
      })
      .catch((rejectedValueOrSerializedError) => {});
  };

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      if (
        errors.project_name ||
        errors.category_type_sector ||
        errors.audit_company_sector ||
        errors.listing_status ||
        errors.launch_date ||
        errors.about_projects
      ) {
        onChangeIndex(0);
        return;
      } else {
        if (
          errors.apply_project_team_members ||
          errors.apply_project_partners
        ) {
          onChangeIndex(1);
          return;
        }
      }
    }
  }, [errors]);

  return (
    <section className="w-full h-full min-h-screen overflow-y-auto flex flex-col items-center bg-upload-content-bg">
      <div className="container mt-12">
        <div className="flex flex-col items-center">
          <SwitchButton
            tabIndex={index}
            className={"sm:mb-20 mb-12"}
            onChangeIndex={onChangeIndex}
            titles={["Description", "Team & Partners"]}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <ApplyProjectDescription
            className={index === 0 ? "flex" : "hidden"}
            reset={reset}
            errors={errors}
            control={control}
            setValue={setValue}
            register={register}
          />
          <ApplyProjectTeamAndPartner
            className={index === 1 ? "flex" : "hidden"}
            reset={reset}
            errors={errors}
            control={control}
            setValue={setValue}
            register={register}
            watch={watch}
          />
          <div className="sm:mt-12 mt-10 flex flex-row w-full justify-center space-x-12 mb-12">
            {/* <button
              className="sm:px-20 px-10 sm:py-3 py-[6px] rounded-[32px] bg-transparent border-btn-bg border-[1px] text-white font-montserrat font-bold text-base"
              type="button"
            >
              {"Preview"}
            </button> */}
            <button
              className="sm:px-20 px-10 sm:py-3 py-[6px] rounded-[32px] bg-btn-bg text-white font-montserrat font-bold text-base hover:bg-green-500"
              type="submit"
            >
              {"Save"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ApplyProjectPage;
