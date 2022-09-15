import PartnerGridUpload from "./PartnerGridUpload";
import TeamGridUpload from "./TeamGridUpload";

const ApplyProjectTeamAndPartner = ({
  className,
  register,
  reset,
  control,
  setValue,
  errors,
  watch,
}) => {
  return (
    <div className={`${className && className} w-full flex flex-col`}>
      <div className="mb-[60px]">
        <div className="text__lg text-green-text-profile mb-6">Team Member</div>
        <div className="flex flex-row gap-x-[102px]">
          <div className="w-full pt-3">
            <TeamGridUpload
              name="apply_project_team_members"
              control={control}
              register={register}
              reset={reset}
              setValue={setValue}
              errors={errors}
              watch={watch}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text__lg text-green-text-profile mb-6">Partners</div>
        <div className="flex flex-row gap-x-[102px]">
          <div className="w-full pt-3">
            <PartnerGridUpload
              name="apply_project_partners"
              reset={reset}
              register={register}
              control={control}
              setValue={setValue}
              watch={watch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyProjectTeamAndPartner;
