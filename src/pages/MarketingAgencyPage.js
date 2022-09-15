import React, { useCallback, useEffect, useState } from "react";
import Description from "../components/marketing-agency/Description";
import { ventureCapitalSchema } from "../_helpers/utils/schema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { fetchCountriesISO, fetchCountriesFlagDial } from "../actions";

import Porfolio from "../components/marketing-agency/Porfolio";
import TeamPartner from "../components/marketing-agency/TeamPartner";
import SwitchButton from "../components/global/SwitchButton";

const MarketingAgencyPage = () => {
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      vcs_certificate: "",
    },
    resolver: yupResolver(ventureCapitalSchema),
  });

  const [index, setIndex] = useState(0);
  const onChangeIndex = useCallback((index) => {
    setIndex(index);
  }, []);
  const onSubmit = async (data) => {
    const dataBody = { ...data };
    console.log("=====dataBody", dataBody);
  };

  return (
    <section className="w-full h-full min-h-screen overflow-y-auto flex flex-col items-center bg-upload-content-bg">
      <div className="flex flex-col items-center mt-15">
        <h1 className="sm:text-3xl text-xl font-montserrat_semi_bold font-bold text-[#00AF71]">
          Marketing Agency
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
        <Porfolio
          className={index === 1 ? "flex" : "hidden"}
          register={register}
          reset={reset}
          errors={errors}
          Controller={Controller}
          setValue={setValue}
          control={control}
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

export default MarketingAgencyPage;
