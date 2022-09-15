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
import CommunityField from "../partials/form/CommunityField";
import CommunityPlus from "../partials/form/CommunityPlus";
import { randomKeyUUID } from "../../_helpers/utils/lib";
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
      name: "twitter",
      iconLeft: IcTwitter,
      placeholder: "Add Twitter link",
      title: "Twitter",
      link: "",
    },
    {
      id: randomKeyUUID(),
      name: "telegram",
      iconLeft: IcTelegram,
      placeholder: "Add Telegram link",
      title: "Telegram",
      link: "",
    },
  ];
  const [communities, setCommunities] = useState(defaultCommunity);
  const [communitiesAdded, setCommunitiesAdded] = useState([]);
  const onAddCommunity = (community) => {
    let newCommunity = [].concat(communities);
    newCommunity.push(community);
    setCommunities(newCommunity);
  };

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  const gridColumns = `grid-cols-${columns}`;
  const gridRows = `grid-rows-${rows}`;

  const [indexSelect, setIndexSelect] = useState(0);
  const onClickSelect = (index) => {
    setIndexSelect(index);
  };

  const handlerCommunity = (id, code, link) => {
    let obj = {
      id: id,
      code: code,
      link: link,
    };
    console.log("link", link);
    console.log("code", code);
    console.log("id", id);
  };

  // const addCommunity = (item) => {
  //   const index = tagsSelected.findIndex((tag) => tag === item);
  //   if (index === -1) {
  //     const updatedItems = [...tagsSelected];
  //     updatedItems.push(item);
  //     setTagsSelected(updatedItems);
  //   }
  // };

  useEffect(() => {
    console.log("error", error);
  }, [error]);

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
                  <p className="sm:text-lg text-base font-semibold font-montserrat_semi_bold text-white sm:mt-12 mt-10">
                    Community
                  </p>
                  <div className="flex flex-row items-start w-full mt-4 sm:space-x-8 space-x-3">
                    <div className="w-full grid sm:grid-cols-2 grid-cols-1 sm:gap-x-8 sm:gap-y-7 gap-x-3 gap-y-2">
                      {communities.map((community, index) => (
                        <div key={index}>
                          <CommunityField
                            index={index}
                            community={community}
                            name={community.name}
                            value={
                              field.value?.social_media?.hasOwnProperty(
                                indexSelect
                              )
                                ? field.value?.social_media[indexSelect]
                                : ""
                            }
                            onChange={(e) => {
                              handlerCommunity(
                                community.id,
                                community.name,
                                e.target.value
                              );
                            }}
                            // onChange={(e) => {
                            //   field.onChange({
                            //     target: {
                            //       name: fieldName,
                            //       // value: {
                            //       //   ...field.value?.social_media[community.name],
                            //       //   social_media[community.name]: e.target.value,
                            //       // },
                            //     },
                            //   });
                            // }}
                            error={
                              error?.portfolios?.hasOwnProperty(indexSelect)
                                ? errors?.portfolios[indexSelect]?.website
                                : null
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <CommunityPlus onAddCommunity={onAddCommunity} />
                  </div>
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
