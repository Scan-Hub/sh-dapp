import { useState } from "react";
import { Controller } from "react-hook-form";
import clsx from "clsx";

import { global } from "../../assets";
import UploadImage from "./UploadImage";
import InputField from "../partials/form/InputField";
import InputAreaField from "../partials/form/InputAreaField";
import InputPhoneNumber from "./InputPhoneNumber";
import YupErrorMessage from "../global/YupErrorMessage";

const TeamGridUpload = (props) => {
  const {
    className,
    name,
    control,
    columns = 3,
    rows = 3,
    widthItem = 100,
    heightItem = 100,
    errors,
    watch,
  } = props;

  const [showErrorTeamMember, setShowErrorTeamMember] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [enablePagePlus, setEnablePagePlus] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(0);
  const [page, setPage] = useState(0);

  const gridColumns = `grid-cols-${columns}`;
  const gridRows = `grid-rows-${rows}`;

  const onCheckFullMember = () => {
    if (page === 0) {
      if (
        watch("apply_project_team_members").filter(
          (e) => e !== undefined && e !== ""
        ).length === 9
      ) {
        setEnablePagePlus(true);
      }
    } else {
      if (
        watch("apply_project_team_members").filter(
          (e) => e !== undefined && e !== ""
        ).length ===
        page * 9
      ) {
        setEnablePagePlus(true);
      }
    }
  };

  const renderUploadGrid = () => {
    return (
      <div className="relative">
        <div className={`grid gap-8 ${gridColumns} ${gridRows}`}>
          {[...new Array(columns * rows)].map((_, index) => {
            const itemIndex = page * 9 + index;
            const fieldName = `${name}.${itemIndex}`;
            return (
              <Controller
                key={`${page}-${index}`}
                name={fieldName}
                control={control}
                render={({ field, formState: { errors } }) => {
                  return (
                    <UploadImage
                      onSelect={() => setCurrentSelected(itemIndex)}
                      name={fieldName}
                      title={
                        <img src={global.IcWhitePlus} alt="ic_white_plus" />
                      }
                      caption={""}
                      width={widthItem}
                      height={heightItem}
                      error={
                        errors?.apply_project_team_members &&
                        errors.apply_project_team_members[currentSelected]
                          ?.profile_picture
                      }
                      value={field.value?.profile_picture}
                      onChange={(path) => {
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: { ...field.value, profile_picture: path },
                          },
                        });
                        setShowErrorTeamMember(false);
                        onCheckFullMember(field);
                      }}
                    />
                  );
                }}
              />
            );
          })}
        </div>
        {/* error messages for required fields */}
        {errors?.apply_project_team_members && showErrorTeamMember && (
          <YupErrorMessage
            className="-bottom-[24px]"
            message={errors?.apply_project_team_members?.message}
          />
        )}
      </div>
    );
  };

  const renderPagination = () => {
    return (
      <div className="flex flex-row gap-x-4">
        <div
          className={clsx(
            "flex flex-row items-center bg-box-bg p-2 pr-4 rounded-lg ",
            {
              "text-white cursor-pointer": page > 0,
              "text-border": page < 1,
            }
          )}
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
              setCurrentSelected((page - 1) * 9);
            }
          }}
        >
          <img src={global.IcLeft} alt="ic_prev" className="mr-2" />
          <span>Prev</span>
        </div>
        {[...new Array(totalPages)].map((_, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center justify-center bg-box-bg w-[40px] h-[40px] cursor-pointer rounded-lg",
              {
                "text-disabled-text": index !== page,
              }
            )}
            onClick={() => {
              setPage(index);
              setCurrentSelected(index * 9);
            }}
          >
            {index + 1}
          </div>
        ))}
        <button
          type="button"
          disabled={!enablePagePlus}
          className="flex items-center justify-center bg-box-bg w-[40px] h-[40px] rounded-lg"
          onClick={() => {
            setTotalPages(totalPages + 1);
            setEnablePagePlus(false);
          }}
        >
          <img src={global.IcPlus} alt="ic_plus" />
        </button>
        <div
          className={clsx(
            "flex flex-row items-center bg-box-bg p-2 pl-4 rounded-lg",
            {
              "text-white cursor-pointer": page + 1 < totalPages,
              "text-border": page + 1 === totalPages,
            }
          )}
          onClick={() => {
            if (page + 1 < totalPages) {
              setPage(page + 1);
              setCurrentSelected((page + 1) * 9);
            }
          }}
        >
          <span>Next</span>
          <img src={global.IcLeft} alt="ic_prev" className="ml-2 rotate-180" />
        </div>
      </div>
    );
  };

  const renderInformation = () => {
    return (
      <div className="w-3/5 flex flex-col">
        {[...new Array(columns * rows)].map((_, index) => {
          const itemIndex = page * 9 + index;
          const fieldName = `${name}.${itemIndex}`;
          return (
            <Controller
              key={`${page}-${index}`}
              name={fieldName}
              control={control}
              render={({ field, formState: { errors } }) => {
                const disableField = field?.value?.profile_picture
                  ? false
                  : true;
                return (
                  <div
                    className={`${
                      currentSelected === itemIndex ? "flex" : "hidden"
                    } flex-col space-y-6`}
                  >
                    <InputField
                      required
                      name={name}
                      title={"Name"}
                      disabled={disableField}
                      placeHolder={"Enter name"}
                      value={field.value?.profile_name}
                      onChange={(e) => {
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: {
                              ...field.value,
                              profile_name: e.target.value,
                            },
                          },
                        });
                      }}
                      error={
                        errors?.apply_project_team_members &&
                        errors?.apply_project_team_members[currentSelected]
                          ?.profile_name
                      }
                    />
                    <InputField
                      required
                      name={name}
                      title={"Title"}
                      disabled={disableField}
                      placeHolder={"Enter title"}
                      value={field.value?.title}
                      onChange={(e) => {
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: {
                              ...field.value,
                              title: e.target.value,
                            },
                          },
                        });
                      }}
                      error={
                        errors?.apply_project_team_members &&
                        errors?.apply_project_team_members[currentSelected]
                          ?.title
                      }
                    />
                    <InputAreaField
                      required
                      note={"(2000 character)"}
                      name={name}
                      title={"Description"}
                      disabled={disableField}
                      placeHolder={"Enter description"}
                      value={field.value?.description}
                      onChange={(e) => {
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: {
                              ...field.value,
                              description: e.target.value,
                            },
                          },
                        });
                      }}
                      error={
                        errors?.apply_project_team_members &&
                        errors?.apply_project_team_members[currentSelected]
                          ?.description
                      }
                    />
                    <InputField
                      required
                      name={name}
                      title={"Email"}
                      disabled={disableField}
                      placeHolder={"Enter email"}
                      value={field.value?.email}
                      onChange={(e) => {
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: {
                              ...field.value,
                              email: e.target.value,
                            },
                          },
                        });
                      }}
                      error={
                        errors?.apply_project_team_members &&
                        errors?.apply_project_team_members[currentSelected]
                          ?.email
                      }
                    />
                    <InputPhoneNumber
                      title={"Phone"}
                      disabled={disableField}
                      placeHolder={"Enter phone number"}
                      name={name.phone_number}
                      value={field.value?.phone_number}
                      onChange={(value) => {
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: {
                              ...field.value,
                              phone_number: value,
                            },
                          },
                        });
                      }}
                      error={
                        errors?.apply_project_team_members &&
                        errors?.apply_project_team_members[currentSelected]
                          ?.phone_number
                      }
                    />
                    <InputField
                      name={name}
                      title={"Linkedin"}
                      disabled={disableField}
                      placeHolder={"Add Linkedin"}
                      value={field.value?.linkedin}
                      onChange={(e) => {
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: {
                              ...field.value,
                              linkedin: e.target.value,
                            },
                          },
                        });
                      }}
                      error={
                        errors?.apply_project_team_members &&
                        errors?.apply_project_team_members[currentSelected]
                          ?.linkedin
                      }
                    />
                  </div>
                );
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-row space-x-12 justify-between">
      <div
        className={clsx(
          "w-auto sh_grid_upload flex flex-col gap-y-8",
          className
        )}
      >
        {renderUploadGrid(page)}
        {renderPagination()}
      </div>
      {renderInformation(page)}
    </div>
  );
};

export default TeamGridUpload;
