import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import clsx from "clsx";

import { global } from "../../assets";
import ControlledUploadImage from "../global/ControlledUploadImage";
import InputField from "../partials/form/InputField";
import IcTelegram from "../../assets/images/profile/telegram.svg";
import IcTwitter from "../../assets/images/profile/twitter.svg";
import InputAreaField from "../partials/form/InputAreaField";
import PhoneField from "../partials/form/PhoneField";
function TeamMemberGridUpload(props) {
  const {
    className,
    register,
    name,
    control,
    setValue,
    error,
    columns = 3,
    rows = 3,
  } = props;
  const defaultCommunity = [
    {
      name: "twitter",
      iconLeft: IcTwitter,
      placeholder: "Add Telegram link",
      title: "Twitter",
    },
    {
      name: "telegram",
      iconLeft: IcTelegram,
      placeholder: "Add Telegram link",
      title: "Telegram",
    },
  ];

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  const gridColumns = `grid-cols-${columns}`;
  const gridRows = `grid-rows-${rows}`;

  const [indexSelect, setIndexSelect] = useState(0);
  const onClickSelect = (index) => {
    setIndexSelect(index);
  };

  useEffect(() => {
    setIndexSelect(page * 9);
  }, [page]);

  const renderUploadGrid = () => {
    return (
      <div
        className={clsx("grid gap-8", {
          [gridColumns]: true,
          [gridRows]: true,
        })}
      >
        {[...new Array(columns * rows)].map((_, index) => {
          const itemIndex = page * 9 + index;
          const fieldName = `${name}.${itemIndex}`;
          return (
            <div
              className={`${
                itemIndex === indexSelect
                  ? "bg-box-bg rounded-2xl border-2 border-[#00AF71] border-dashed"
                  : "bg-box-bg rounded-2xl border-2 border-drop-border border-dashed"
              }`}
            >
              <Controller
                key={`${page}-${index}`}
                name={fieldName}
                control={control}
                render={({ field, formState: { errors } }) => (
                  <ControlledUploadImage
                    title={<img src={global.IcWhitePlus} alt="ic_white_plus" />}
                    caption={""}
                    width={100}
                    height={100}
                    errors={errors[fieldName]}
                    value={field.value?.image}
                    onChange={(path) => {
                      field.onChange({
                        target: {
                          name: fieldName,
                          value: { ...field.value, image: path },
                        },
                      });
                    }}
                    onClick={() => onClickSelect(itemIndex)}
                  />
                )}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderInputField = () => {
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
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <div
                  className={`${
                    indexSelect === itemIndex ? "flex" : "hidden"
                  } relative flex-col space-y-6`}
                >
                  <InputField
                    required
                    className={`${
                      indexSelect === itemIndex ? "block" : "hidden"
                    } relative space-y-3`}
                    title={"Name"}
                    placeHolder={"Enter name"}
                    name={name}
                    value={field.value?.name}
                    onChange={(e) => {
                      field.onChange({
                        target: {
                          name: fieldName,
                          value: { ...field.value, name: e.target.value },
                        },
                      });
                    }}
                    error={
                      error?.team_members?.hasOwnProperty(indexSelect)
                        ? errors?.team_members[indexSelect]?.name
                        : null
                    }
                  />
                  <InputField
                    required
                    className={`${
                      indexSelect === itemIndex ? "block" : "hidden"
                    } relative space-y-3`}
                    title={"Title"}
                    placeHolder={"Enter title"}
                    name={name}
                    value={field.value?.title}
                    onChange={(e) => {
                      field.onChange({
                        target: {
                          name: fieldName,
                          value: { ...field.value, title: e.target.value },
                        },
                      });
                    }}
                    error={
                      error?.team_members?.hasOwnProperty(indexSelect)
                        ? errors?.team_members[indexSelect]?.title
                        : null
                    }
                  />
                  <InputAreaField
                    required
                    className={`${
                      indexSelect === itemIndex ? "block" : "hidden"
                    } relative space-y-3`}
                    title={"Description"}
                    placeHolder={"Enter description"}
                    name={name}
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
                      error?.team_members?.hasOwnProperty(indexSelect)
                        ? errors?.team_members[indexSelect]?.description
                        : null
                    }
                  />
                  <InputField
                    required
                    className={`${
                      indexSelect === itemIndex ? "block" : "hidden"
                    } relative space-y-3`}
                    title={"Email"}
                    placeHolder={"Enter email"}
                    name={name}
                    value={field.value?.email}
                    onChange={(e) => {
                      field.onChange({
                        target: {
                          name: fieldName,
                          value: { ...field.value, email: e.target.value },
                        },
                      });
                    }}
                    error={
                      error?.team_members?.hasOwnProperty(indexSelect)
                        ? errors?.team_members[indexSelect]?.email
                        : null
                    }
                  />
                  <PhoneField
                    required
                    className={`${
                      indexSelect === itemIndex ? "block" : "hidden"
                    } relative space-y-3`}
                    title={"Phone"}
                    placeHolder={"Enter phone number"}
                    value={field.value?.phone}
                    onChange={(data, type) => {
                      if (type === "prefix") {
                        console.log("prefix", data);
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: {
                              ...field.value,
                              phone: {
                                ...field.value?.phone,
                                code: data.code,
                                prefix: data.dial_code,
                              },
                            },
                          },
                        });
                      }
                      if (type === "number") {
                        console.log("number", data.number);
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: {
                              ...field.value,
                              phone: {
                                ...field.value?.phone,
                                number: data.number,
                              },
                            },
                          },
                        });
                      }
                    }}
                    error={
                      error?.team_members?.hasOwnProperty(indexSelect)
                        ? errors?.team_members[indexSelect]?.phone?.number
                        : null
                    }
                  />
                  <InputField
                    className={`${
                      indexSelect === itemIndex ? "block" : "hidden"
                    } relative space-y-3`}
                    title={"Linkedin"}
                    placeHolder={"Add Linkedin"}
                    name={name}
                    value={field.value?.linkedin}
                    onChange={(e) => {
                      field.onChange({
                        target: {
                          name: fieldName,
                          value: { ...field.value, linkedin: e.target.value },
                        },
                      });
                    }}
                    error={
                      error?.team_members?.hasOwnProperty(indexSelect)
                        ? errors?.team_members[indexSelect]?.linkedin
                        : null
                    }
                  />
                </div>
              )}
            />
          );
        })}
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
            if (page > 0) setPage(page - 1);
          }}
        >
          <img
            src={global.IcLeft}
            // width="16"
            // height="16"
            alt="ic_prev"
            className="mr-2"
          />
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
            onClick={() => setPage(index)}
          >
            {index + 1}
          </div>
        ))}
        <div
          className="flex items-center justify-center bg-box-bg w-[40px] h-[40px] cursor-pointer rounded-lg"
          onClick={() => {
            setTotalPages(totalPages + 1);
            // append({});
          }}
        >
          <img src={global.IcPlus} alt="ic_plus" />
        </div>
        <div
          className={clsx(
            "flex flex-row items-center bg-box-bg p-2 pl-4 rounded-lg",
            {
              "text-white cursor-pointer": page + 1 < totalPages,
              "text-border": page + 1 === totalPages,
            }
          )}
          onClick={() => {
            if (page + 1 < totalPages) setPage(page + 1);
          }}
        >
          <span>Next</span>
          <img
            src={global.IcLeft}
            // width="16"
            // height="16"
            alt="ic_prev"
            className="ml-2 rotate-180"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full justify-between">
      <div
        className={clsx(
          "w-auto sh_grid_upload flex flex-col gap-y-8",
          className
        )}
      >
        {renderUploadGrid(page)}
        {renderPagination()}
      </div>
      {renderInputField(page)}
    </div>
  );
}

TeamMemberGridUpload.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

export default TeamMemberGridUpload;
