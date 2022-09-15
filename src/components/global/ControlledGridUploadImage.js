import { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFieldArray } from "react-hook-form";
import clsx from "clsx";

import { global } from "../../assets";
import ControlledUploadImage from "./ControlledUploadImage";

function ControlledGridUploadImage(props) {
  const { className, name, control, columns = 3, rows = 3 } = props;
  const { append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name, // unique name for your Field Array
  });

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  const gridColumns = `grid-cols-${columns}`;
  const gridRows = `grid-rows-${rows}`;

  // const removePage = () => {
  /**
   * * Remove all image and clean up child state
   */
  // }

  const renderUploadGrid = () => {
    return (
      <div
        className={clsx("grid gap-8", {
          [gridColumns]: true,
          [gridRows]: true,
        })}
      >
        {[...new Array(columns * rows)].map((_, index) => {
          const fieldName = `${name}.${page}.${index}`;
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
                  value={field.value}
                  onChange={(path) => {
                    field.onChange({
                      target: {
                        name: fieldName,
                        value: path,
                      },
                    });
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
            append({});
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
    <div className={clsx("sh_grid_upload flex flex-col gap-y-8", className)}>
      {renderUploadGrid(page)}
      {renderPagination()}
    </div>
  );
}

ControlledGridUploadImage.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

export default ControlledGridUploadImage;
