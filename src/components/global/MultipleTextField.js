import React, { useCallback, useState } from "react";

const MultipleTextField = ({
  name,
  title,
  iconTitle,
  placeholder,
  className,
  disable = false,
  styleTextArea,
  onFocusOut,
  onTextChange,
  value = null,
  required = true,
}) => {
  const [error, setError] = useState(null);
  const onBlur = useCallback(
    (e) => {
      onFocusOut && onFocusOut(e);
      if (required) {
        if (e.target.value === "") {
          setError("Please fill this field");
          document.getElementById(name).focus();
        }
      }
    },
    [name, onFocusOut, required]
  );
  const onChange = useCallback(
    (e) => {
      onTextChange && onTextChange(e);
      if (e.target.value !== "") {
        setError("");
      }
    },
    [onTextChange]
  );

  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex flex-row items-center">
        {iconTitle && (
          <img src={iconTitle} alt="allAdmin" className="w-6 h-6 mr-3" />
        )}
        {title && (
          <p
            className={`sm:text-lg text-base font-semibold font-montserrat_semi_bold ${
              disable ? "text-disabled-text" : "text-white"
            }`}
          >
            {title}
          </p>
        )}
      </div>
      <textarea
        id={name}
        onBlur={onBlur}
        autoComplete="off"
        disabled={disable}
        onChange={onChange}
        style={styleTextArea}
        placeholder={placeholder}
        value={value ? value : ""}
        className={`bg-box-bg h-[180px] rounded-lg py-3 px-4 mt-4 focus:outline-none appearance-none placeholder:text-placeholder-text ${
          disable ? "text-disabled-text" : "text-white"
        } font-montserrat placeholder:text-sm placeholder:sm:text-base sm:text-base text-sm`}
        required={required}
      />
      {error && (
        <p className="text-error text-sm font-montserrat font-normal mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default MultipleTextField;
