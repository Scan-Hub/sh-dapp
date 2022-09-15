import React, { useCallback, useEffect, useState } from "react";
import SwitchButton from "../components/global/SwitchButton";
// import Description from "../components/launchpad/Description";
// import Porfolio from "../components/launchpad/Porfolio";
// import TeamPartner from "../components/launchpad/TeamPartner";

import { ventureCapitalSchema } from "../_helpers/utils/schema";
import Description from "../components/incubator/Description";
import Porfolio from "../components/incubator/Porfolio";
import TeamPartner from "../components/incubator/TeamPartner";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesISO, fetchCountriesFlagDial } from "../actions";

import * as schemas from "../schema";

const Incubator = () => {
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas.schemaIncubator),
  });

  const [index, setIndex] = useState(0);
  const onChangeIndex = useCallback((index) => {
    setIndex(index);
  }, []);

  const onSubmit = async (data) => {
    console.log("=====onSubmit", data);
    const dataBody = { ...data };
  };

  return (
    <section className="w-full h-full min-h-screen overflow-y-auto flex flex-col items-center bg-upload-content-bg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col items-center mt-12 pb-40"
      >
        <div className="flex flex-col items-center mt-15">
          <h1 className="sm:text-3xl text-xl font-montserrat_semi_bold font-bold text-[#00AF71]">
            Incubator
          </h1>
        </div>
        <div className="flex flex-col items-center mt-15">
          <SwitchButton
            tabIndex={index}
            className={"sm:mb-20 mb-12"}
            onChangeIndex={onChangeIndex}
            titles={["Description", "Portfolio", "Team & Partner"]}
          />
        </div>
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

export default Incubator;
