import React, { useRef } from "react";
import { vcs } from "../../assets";
import YupErrorMessage from "./YupErrorMessage";

import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
  className,
  required = false,
  title,
  name,
  placeholder,
  error,
  control,
}) => {
  const datepickerRef = useRef(null);
  function handleClickDatepickerIcon() {
    const datepickerElement = datepickerRef.current;
    datepickerElement.setFocus(true);
  }
  return (
    <div className={`${className} flex flex-col`}>
      {title && (
        <span className="font-montserrat_semi_bold mb-4 sm:text-lg text-base text-white">
          {title}
          {required && (
            <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
              *
            </span>
          )}
        </span>
      )}
      <div className="bg-[#191B2A] w-full pr-4 rounded-lg flex flex-row items-center relative">
        <Controller
          name={name}
          control={control}
          defaultValue={""}
          render={({
            field: { onChange, value },
            fieldState: { error, invalid },
          }) => (
            <DatePicker
              ref={datepickerRef}
              selectsStart
              timeIntervals={1}
              // minDate={Date.now()}
              selected={value}
              placeholderText={placeholder}
              dateFormat={"dd/MM/yyyy"}
              onChange={(date) => {
                onChange(date ? date : "");
              }}
              shouldCloseOnSelect={true}
              className={`bg-transparent rounded-lg flex flex-row items-center focus:outline-none appearance-none w-full sm:text-base text-sm text-white font-montserrat_medium`}
            />
          )}
        />

        <img
          src={vcs.IcCalendar}
          alt="iconRight"
          className="w-6 h-6 ml-[10px]"
          onClick={() => handleClickDatepickerIcon()}
        />
        {error && <YupErrorMessage message={error.message} />}
      </div>
    </div>
  );
};

export default DatePickerComponent;
