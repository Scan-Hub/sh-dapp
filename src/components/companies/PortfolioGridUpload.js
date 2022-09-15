import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFieldArray } from "react-hook-form";
import clsx from "clsx";

import { global } from "../../assets";
import ControlledUploadImage from "../global/ControlledUploadImage";
import YupErrorMessage from "../global/YupErrorMessage";
import InputField from "../partials/form/InputField";
import IcTelegram from "../../assets/images/profile/telegram.svg";
import IcTwitter from "../../assets/images/profile/twitter.svg";
import IcMedium from "../../assets/images/profile/medium.svg";
import IcDiscord from "../../assets/images/profile/discord_circle.svg";
// import CommunityPlus from "../global/CommunityPlus";
import CommunityField from "../partials/form/CommunityField";
import CommunityPlus from "../partials/form/CommunityPlus";
import { randomKeyUUID } from "../../_helpers/utils/lib";
import SelectBox from "../global/SelectBox";
function PortfolioGridUpload(props) {
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
  ];
  const projectStatus = [
    { id: "in_progress", name: "Inprogress" },
    { id: "completed", name: "Completed" },
  ];
  const [communities, setCommunities] = useState(defaultCommunity);
  const onAddCommunity = (community) => {
    let newCommunity = [].concat(communities);
    newCommunity.push(community);
    setCommunities(newCommunity);
  };
  const onRemoveCommunity = (id) => {
    setCommunities(
      communities.filter((item) => {
        if (!item.id.includes(id)) {
          return true;
        }
        return false;
      })
    );
  };

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  const gridColumns = `grid-cols-${columns}`;
  const gridRows = `grid-rows-${rows}`;

  const [indexSelect, setIndexSelect] = useState(0);
  const onClickSelect = (index) => {
    setIndexSelect(index);
  };

  const [data, setData] = useState();

  const pushCommunity = (item, value) => {
    let flag = false;
    communities.map((community) => {
      if (item.id === community.id) {
        community.link = value;
      }
      if (community.link) {
        flag = true;
      }
    });
    if (flag) {
      return communities;
    } else return [];
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
                    value={field.value?.logo}
                    onChange={(path) => {
                      field.onChange({
                        target: {
                          name: fieldName,
                          value: { ...field.value, logo: path },
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
                    title={"Project name"}
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
                      error?.portfolios?.hasOwnProperty(indexSelect)
                        ? errors?.portfolios[indexSelect]?.name
                        : null
                    }
                  />
                  <InputField
                    required
                    className={`${
                      indexSelect === itemIndex ? "block" : "hidden"
                    } relative space-y-3`}
                    title={"Website"}
                    placeHolder={"Enter link"}
                    name={name}
                    value={field.value?.website}
                    onChange={(e) => {
                      field.onChange({
                        target: {
                          name: fieldName,
                          value: { ...field.value, website: e.target.value },
                        },
                      });
                    }}
                    error={
                      error?.portfolios?.hasOwnProperty(indexSelect)
                        ? errors?.portfolios[indexSelect]?.website
                        : null
                    }
                  />
                  <div className="relative mt-6">
                    <p className="sm:text-lg text-base font-semibold font-montserrat_semi_bold text-white">
                      Social Media
                    </p>
                    <div className="flex flex-row items-start w-full mt-4 sm:space-x-8 space-x-3">
                      <div className="w-full grid sm:grid-cols-2 grid-cols-1 sm:gap-x-8 sm:gap-y-7 gap-x-3 gap-y-2">
                        {communities.map((community, index) => (
                          <div key={index}>
                            <CommunityField
                              index={index}
                              community={community}
                              name={community.id}
                              value={
                                field.value?.social_media?.hasOwnProperty(
                                  indexSelect
                                )
                                  ? field.value?.social_media[indexSelect]
                                  : ""
                              }
                              onChange={(e) => {
                                field.onChange({
                                  target: {
                                    name: fieldName,
                                    value: {
                                      ...field.value,
                                      social_media: pushCommunity(
                                        community,
                                        e.target.value
                                      ),
                                    },
                                  },
                                });
                              }}
                              onRemoveCommunity={onRemoveCommunity}
                              // error={
                              //   error?.portfolios?.hasOwnProperty(indexSelect)
                              //     ? errors?.portfolios[indexSelect]?.website
                              //     : null
                              // }
                            />
                          </div>
                        ))}
                      </div>
                      <CommunityPlus onAddCommunity={onAddCommunity} />
                    </div>
                    {errors?.portfolios &&
                      errors?.portfolios[indexSelect] &&
                      errors?.portfolios[indexSelect]?.social_media && (
                        <YupErrorMessage
                          message={
                            errors?.portfolios[indexSelect]?.social_media
                              ?.message
                          }
                        />
                      )}
                  </div>
                  <SelectBox
                    type={"jsonArr"}
                    className={"mt-6"}
                    register={register}
                    setValue={setValue}
                    title={"Status of the project"}
                    options={projectStatus}
                    name={`${name}[${indexSelect}].status`}
                    placeholder={"Select"}
                    error={
                      error?.portfolios?.hasOwnProperty(indexSelect)
                        ? errors?.portfolios[indexSelect]?.status
                        : null
                    }
                    control={control}
                  />
                </div>
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

PortfolioGridUpload.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

export default PortfolioGridUpload;