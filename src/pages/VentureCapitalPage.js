import React, { useCallback, useEffect, useState } from "react";

import Description from "../components/vcs/Description";
import { ventureCapitalSchema } from "../_helpers/utils/schema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { fetchCountriesISO, fetchCountriesFlagDial } from "../actions";
import Portfolio from "../components/vcs/Portfolio";
import TeamPartner from "../components/vcs/TeamPartner";
import SwitchButton from "../components/global/SwitchButton";
import { submitVentureCapital } from "../actions/form.actions";
import { openModalSubmitForm } from "../reducers/form.reducer";
import { formatTimeStamp } from "../_helpers/lib";

const VentureCapitalPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountriesISO());
    dispatch(fetchCountriesFlagDial());
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    trigger,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ventureCapitalSchema),
  });
  useEffect(() => {
    console.log("errors", errors);
    if (errors) {
      checkTabError(errors);
    }
  }, [errors]);

  const [index, setIndex] = useState(0);
  const onChangeIndex = useCallback((index) => {
    setIndex(index);
  }, []);

  const checkTabError = (errors) => {
    if (
      errors?.total_funding_amount ||
      errors?.total_number_of_investment ||
      errors?.portfolios
    ) {
      setIndex(1);
    } else if (errors?.team_members || errors?.partners) {
      setIndex(2);
    } else {
      setIndex(0);
    }
    if (errors?.community) {
      setError("community", {
        message: "Invalid data!",
      });
    }
  };

  const onSubmit = async (data) => {
    const dataBody = { ...data };
    console.log("=====dataBody", dataBody);
    const portfolios = dataBody?.portfolios;
    const arrPortfolios = [];
    portfolios?.map((item) => {
      if (item?.logo && item?.name && item?.website) {
        let arrCommunityPortfolio = [];
        item?.social_media?.map((socialMedia) => {
          if (socialMedia?.link && socialMedia?.code) {
            let obj = { code: socialMedia.code, link: socialMedia.link };
            arrCommunityPortfolio.push(obj);
          }
        });
        item.social_media = arrCommunityPortfolio;

        arrPortfolios.push(item);
      }
    });
    if (arrPortfolios.length === 0) {
      setError("portfolios", {
        type: "min",
        message: "Portfolio field must have at least 1 item",
      });
      setIndex(1);
      return;
    }

    const team_members = dataBody.team_members;
    const arrTeamMembers = [];
    team_members.map((item) => {
      if (
        item?.image &&
        item?.name &&
        item?.title &&
        item?.description &&
        item?.email &&
        item?.phone
      ) {
        arrTeamMembers.push(item);
      }
    });
    if (arrTeamMembers.length === 0) {
      setError("team_members", {
        type: "min",
        message: "Team members field must have at least 1 item",
      });
      setIndex(2);
      return;
    }

    const partners = dataBody.partners;
    const arrPartners = [];
    partners.map((item) => {
      if (item?.logo && item?.name && item?.website) {
        arrPartners.push(item);
      }
    });
    if (arrPartners.length === 0) {
      setError("partners", {
        type: "min",
        message: "Partners field must have at least 1 item",
      });
      setIndex(2);
      return;
    }

    const community = dataBody.community;
    const arrCommunity = [];
    community?.map((item) => {
      if (item?.link) {
        let obj = { code: item.code, link: item.link };
        arrCommunity.push(obj);
      }
    });

    let founder_ids = [];
    if (dataBody?.founder_ids1) {
      founder_ids = [...founder_ids, dataBody.founder_ids1];
    }
    if (dataBody?.founder_ids2) {
      founder_ids = [...founder_ids, dataBody.founder_ids2];
    }
    await dispatch(
      submitVentureCapital({
        name: dataBody.name,
        stage_of_investment: dataBody.stage_of_investment,
        sectors_of_investment: dataBody.sectors_of_investment,
        team_members: arrTeamMembers,
        partners: arrPartners,
        email: dataBody.email,
        phone: dataBody.phone,
        number_of_employees: dataBody.number_of_employees,
        country: dataBody.country,
        business_registration_certificate:
          dataBody.business_registration_certificate,
        website: dataBody.website,
        founded_date: formatTimeStamp(dataBody.founded_date),
        operating_status: dataBody.operating_status,
        community: arrCommunity,
        logo: dataBody.logo,
        about_company: dataBody.about_company,
        location: dataBody.location,
        total_funding_amount: dataBody.total_funding_amount,
        total_number_of_investment: dataBody.total_number_of_investment,
        portfolios: arrPortfolios,
        founder_ids: founder_ids,
        other_categories: dataBody.other_categories,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        console.log("originalPromiseResult", originalPromiseResult);
        const { data, errors } = originalPromiseResult;
        if (data?.status === "submitted") {
          dispatch(openModalSubmitForm({ isOpen: true }));
        } else {
          alert(JSON.stringify(errors));
        }
      });
  };

  return (
    <section className="w-full h-full min-h-screen overflow-y-auto flex flex-col items-center bg-upload-content-bg">
      <div className="flex flex-col items-center mt-15">
        <h1 className="sm:text-3xl text-xl font-montserrat_semi_bold font-bold text-[#00AF71]">
          Venture Capital
        </h1>
      </div>
      <div className="flex flex-col items-center mt-12">
        <SwitchButton
          tabIndex={index}
          className={"sm:mb-20 mb-12"}
          onChangeIndex={onChangeIndex}
          titles={["Description", "Portfolio", "Team & Partner"]}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col items-center pb-40"
      >
        <Description
          className={index === 0 ? "flex" : "hidden"}
          register={register}
          reset={reset}
          errors={errors}
          Controller={Controller}
          setValue={setValue}
          control={control}
        />
        <Portfolio
          className={index === 1 ? "flex" : "hidden"}
          register={register}
          reset={reset}
          errors={errors}
          Controller={Controller}
          setValue={setValue}
          control={control}
          trigger={trigger}
        />
        <TeamPartner
          className={index === 2 ? "flex" : "hidden"}
          register={register}
          reset={reset}
          errors={errors}
          Controller={Controller}
          setValue={setValue}
          control={control}
        />
        <button
          className="w-[200px] h-12 bg-[#00AF71] text-white text-base font-montserrat_medium rounded-[32px]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default VentureCapitalPage;
