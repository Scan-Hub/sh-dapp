import React from "react";
import PropTypes from "prop-types";
import YupErrorMessage from "../../global/YupErrorMessage";

function InputField(props) {
  const {
    required,
    disabled = false,
    className,
    name,
    onChange,
    value,
    error,
    title,
    placeHolder,
  } = props;

  return (
    <div className={`${className || ""} flex flex-col w-full`}>
      <div className={`${title ? "mb-4 " : "mb-0"} flex flex-row items-center`}>
        {title && (
          <>
            <p
              className={`sm:text-lg text-base font-semibold font-montserrat_semi_bold ${
                disabled ? "text-disabled-text" : "text-white "
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
      </div>

      <div className="relative rounded-lg flex flex-row items-center bg-box-bg">
        <input
          disabled={disabled}
          className="bg-box-bg focus:ring-1 focus:ring-vbDisableText focus:rounded-lg rounded-lg py-[12px] px-[16px] focus:outline-none appearance-none w-full font-montserrat placeholder:text-placeholder-text
        text-white placeholder:text-sm placeholder:sm:text-base sm:text-base text-sm"
          placeholder={placeHolder}
          name={name}
          autoComplete="off"
          value={value}
          onChange={onChange}
        />
        {error && <YupErrorMessage message={error?.message} />}
      </div>
    </div>
  );
}
InputField.propTypes = {
  required: PropTypes.bool,
  disable: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  errors: PropTypes.object,
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
};

export default InputField;
