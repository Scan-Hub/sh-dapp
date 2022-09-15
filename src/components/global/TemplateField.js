import React from "react";
import ControlTemplate from "./ControlTemplate";
import IcCloudComputing from "../../assets/images/profile/cloud-computing.svg";
import InputFieldAutoHeight from "./InputFieldAutoHeight";

const TemplateField = ({
  id,
  onMoveDown,
  onMoveUp,
  onAdd,
  onRemove,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col w-full space-y-8 mt-8 group">
      <div className="w-full flex flex-row items-center space-x-16">
        <div
          className={`${
            id !== 0 && "hover:border-border"
          } hover:border-dashed border-transparent border-[2px] w-full flex-1 relative`}
        >
          <input
            type="text"
            autoComplete="off"
            name={`template.${id}.title`}
            disabled={id === 0 ? true : false}
            placeholder={id === 0 ? "DESCRIPTION" : "ENTER TITLE"}
            {...register(`template.${id}.title`, {
              value: id === 0 ? "DESCRIPTION" : "",
            })}
            className="w-full bg-transparent py-2 focus:outline-none text-2xl text-green-text-profile placeholder:text-green-text-profile font-montserrat font-normal"
          />
          {errors && errors.template && (
            <p className="absolute left-1 -bottom-7 sm:text-sm text-xs text-yellow-600 dark:text-yellow-500">
              {errors.template[id]?.title?.message}
            </p>
          )}
        </div>
        <div className="hidden group-hover:flex group">
          <ControlTemplate
            // onMoveDown={() => onMoveDown(id)}
            // onMoveUp={() => onMoveUp(id)}
            onAdd={() => onAdd(id)}
            onRemove={() => onRemove(id)}
          />
        </div>
      </div>
      <div className="w-full flex flex-row items-center">
        <div className="hover:border-dashed hover:border-border border-transparent border-[2px] w-full flex-1 relative">
          <input
            type="text"
            placeholder="Enter Subtitle"
            name={`template.${id}.sub_title`}
            {...register(`template.${id}.sub_title`)}
            className="w-full bg-transparent py-2 focus:outline-none text-2xl text-white placeholder:text-white font-montserrat_bold font-bold"
          />
          {errors && errors.template && (
            <p className="absolute left-1 -bottom-7 sm:text-sm text-xs text-yellow-600 dark:text-yellow-500">
              {errors.template[id]?.sub_title?.message}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-row items-center">
        <div className="hover:border-dashed hover:border-border border-transparent border-[2px] w-full flex-1 relative">
          <InputFieldAutoHeight
            register={register}
            name={`template.${id}.description`}
            error={
              errors && errors.template && errors.template[id]?.description
            }
            placeholder={"Enter description"}
          />
          {/* <input
            type="text"
            placeholder="Enter description"
            name={`template.${id}.description`}
            {...register(`template.${id}.description`)}
            className="w-full bg-transparent py-2 focus:outline-none text-base text-text-des placeholder:text-text-des font-montserrat font-normal"
          />
          {errors && errors.template && (
            <p className="absolute left-1 -bottom-7 sm:text-sm text-xs text-yellow-600 dark:text-yellow-500">
              {errors.template[id]?.description?.message}
            </p>
          )} */}
        </div>
      </div>
      <div className="w-full flex flex-row items-center space-x-6">
        <div className="flex flex-2">
          <p className="text-base text-white font-montserrat_medium font-medium ml-[2px]">
            Add link:
          </p>
        </div>
        <div className="relative flex-1 w-full">
          <input
            autoComplete="off"
            placeholder={"Enter your link"}
            name={`template.${id}.link`}
            {...register(`template.${id}.link`)}
            className={`bg-box-bg focus:ring-1 focus:ring-vbDisableText focus:rounded-lg rounded-lg py-3 px-4 focus:outline-none appearance-none w-full font-montserrat placeholder:text-border text-white placeholder:text-sm placeholder:sm:text-base sm:text-base text-sm`}
          />
          {errors && errors.template && (
            <p className="absolute left-1 -bottom-7 sm:text-sm text-xs text-yellow-600 dark:text-yellow-500">
              {errors.template[id]?.link?.message}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-row items-center space-x-6">
        <div className="flex flex-2">
          <p className="text-base text-white font-montserrat_medium font-medium ml-[2px]">
            Upload Image/Video:
          </p>
        </div>
        <label className="flex flex-row items-center text-base font-poppins text-white border-[1px] border-text-des rounded-lg py-3 px-[22px] cursor-pointer">
          <img src={IcCloudComputing} alt="upload" className="w-6 h-6 mr-3" />
          Choose file to upload
          <input
            type="file"
            name="myImage"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            onChange={(e) => null}
          />
        </label>
        <p className="text-border font-montserrat font-normal text-base">
          (Recommend size 1200x675)
        </p>
      </div>
      <div className="w-full h-[1px] bg-border" />
    </div>
  );
};

export default TemplateField;
