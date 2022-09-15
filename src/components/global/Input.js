import React from "react";
import YupErrorMessage from "./YupErrorMessage";

export function Input({
  name,
  reset,
  type = "text",
  error,
  note,
  title,
  disable,
  register,
  iconLeft,
  className,
  iconTitle,
  iconRight,
  styleInput,
  placeholder,
  required = false,
  ...inputProps
}) {
  return (
    <div className={`${className || ""} flex flex-col w-full`}>
      <div className={`${title ? "mb-4 " : "mb-0"} flex flex-row items-center`}>
        {title && (
          <>
            <p
              className={`sm:text-lg text-base font-semibold font-montserrat_semi_bold ${
                disable ? "text-disabled-text" : "text-white "
              }`}
            >
              {title}
            </p>
            {required && (
              <p className="sm:text-lg text-base font-semibold font-montserrat_semi_bold text-[#F5222D] ml-1">
                *
              </p>
            )}
          </>
        )}
        {note && (
          <p className="ml-1 text-sm text-[#7E7E7F] font-normal">{note}</p>
        )}
        {iconTitle && (
          <img src={iconTitle} alt="allAdmin" className="w-6 h-6 ml-3" />
        )}
      </div>

      <div className="relative rounded-lg flex flex-row items-center bg-box-bg">
        <input
          type={type}
          name={name}
          autoComplete="off"
          disabled={disable}
          placeholder={placeholder}
          style={styleInput}
          min={type === "number" ? 0 : null}
          className={`${
            iconLeft && "pl-12"
          } bg-box-bg focus:ring-1 focus:ring-vbDisableText focus:rounded-lg rounded-lg py-[12px] px-[16px] focus:outline-none appearance-none w-full font-montserrat placeholder:text-placeholder-text ${
            disable ? "text-disabled-text" : "text-white"
          } placeholder:text-sm placeholder:sm:text-base sm:text-base text-sm`}
          {...register(name)}
          {...inputProps}
          {...reset}
        />
        {iconLeft && (
          <img
            src={iconLeft}
            alt="iconLeft"
            className="absolute left-0 w-6 h-6 ml-4"
          />
        )}
        {iconRight && (
          <img src={iconRight} alt="iconRight" className="w-6 h-6 ml-[10px]" />
        )}
        {error && <YupErrorMessage message={error.message} />}
      </div>
    </div>
  );
}
