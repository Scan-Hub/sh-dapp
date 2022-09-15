import clsx from "clsx";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { global } from "../../assets";
import InputField from "../partials/form/InputField";
import UploadImage from "./UploadImage";

const PartnerGridUpload = (props) => {
  const {
    className,
    name,
    control,
    columns = 3,
    rows = 3,
    widthItem = 100,
    heightItem = 100,
    watch,
  } = props;

  const gridColumns = `grid-cols-${columns}`;
  const gridRows = `grid-rows-${rows}`;

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [enablePagePlus, setEnablePagePlus] = useState(false);

  const [indexSelect, setIndexSelect] = useState(0);

  const onCheckPartner = () => {
    if (page === 0) {
      if (
        watch("apply_project_partners").filter(
          (e) => e !== undefined && e !== ""
        ).length === 9
      ) {
        setEnablePagePlus(true);
      }
    } else {
      if (
        watch("apply_project_partners").filter(
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
                <UploadImage
                  name={fieldName}
                  onSelect={() => setIndexSelect(itemIndex)}
                  title={<img src={global.IcWhitePlus} alt="ic_white_plus" />}
                  caption={""}
                  width={widthItem}
                  height={heightItem}
                  error={
                    errors?.apply_project_partners &&
                    errors.apply_project_partners[itemIndex]?.logo
                  }
                  value={field.value?.logo}
                  onChange={(path) => {
                    field.onChange({
                      target: {
                        name: fieldName,
                        value: { ...field.value, logo: path },
                      },
                    });
                    onCheckPartner();
                  }}
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
            if (page > 0) {
              setPage(page - 1);
              setIndexSelect((page - 1) * 9);
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
              setIndexSelect(index * 9);
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
              setIndexSelect((page + 1) * 9);
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
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => {
                const disableField = field?.value?.logo ? false : true;
                return (
                  <div
                    className={`${
                      indexSelect === itemIndex ? "flex" : "hidden"
                    } flex-col space-y-6`}
                  >
                    <InputField
                      required
                      title={"Name"}
                      disabled={disableField}
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
                        errors?.apply_project_partners &&
                        errors?.apply_project_partners[indexSelect]?.name
                      }
                    />
                    <InputField
                      required
                      title={"Website link"}
                      disabled={disableField}
                      placeHolder={"Enter link"}
                      name={name}
                      value={field.value?.link}
                      onChange={(e) => {
                        field.onChange({
                          target: {
                            name: fieldName,
                            value: { ...field.value, link: e.target.value },
                          },
                        });
                      }}
                      error={
                        errors?.apply_project_partners &&
                        errors?.apply_project_partners[indexSelect]?.link
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
      {renderInformation(page)}
    </div>
  );
};

export default PartnerGridUpload;
