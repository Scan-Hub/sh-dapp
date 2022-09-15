import React from "react";

import { Input } from "../global/Input";
import { selectcountriesFlagDial } from "../../reducers/countries.reducer";
import SelectPhone from "../global/SelectPhone";
import { useSelector } from "react-redux";
import ControlledGridUploadImage from "../form/controlled_grid_upload";
import PartnerGridUpload from "./PartnerGridUpload";
import TeamMemberGridUpload from "./TeamMemberGridUpload";

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
      <div className="w-full">
        <div className="flex flex-col space-y-9 mt-8">
          <span className="text-xl text-[#00AF71] font-montserrat_bold">
            Team Member
          </span>
          <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12">
            <div className="w-full pt-3">
              <TeamMemberGridUpload
                name="team_members"
                reset={reset}
                register={register}
                control={control}
                setValue={setValue}
                error={errors}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col space-y-9 mt-8">
          <span className="text-xl text-[#00AF71] font-montserrat_bold">
            Partners
          </span>
          <div className="flex sm:flex-row items-start justify-between flex-col mt-4 w-full sm:space-x-12">
            <div className="w-full pt-3">
              <PartnerGridUpload
                name="partners"
                reset={reset}
                register={register}
                control={control}
                setValue={setValue}
                error={errors}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPartner;
