import React from "react";
import { vcs } from "../../assets";
import Select, { components } from "react-select";
import YupErrorMessage from "../global/YupErrorMessage";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={vcs.IcArrowBot} alt="" />
    </components.DropdownIndicator>
  );
};
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#191B2A",
    width: "100%",
    border: 0,
    boxShadow: "none",
    padding: "12px 16px",
    borderRadius: "8px",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: "6px",
    padding: 0,
    background: "#191B2A",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: "#191B2A",
      ":hover": {
        background: "rgba(101, 104, 129, 0.2)",
      },
      cursor: "pointer",
      border: null, // tried border: 'none'
      boxShadow: null, // tried border: 'none'
      outline: 0,
    };
  },
  singleValue: (provided, state) => {
    return { ...provided, color: "#656881" };
  },
  indicatorSeparator: (provided, state) => {
    return { ...provided, width: 0 };
  },
  indicatorsContainer: (provided, state) => {
    return { ...provided, color: "#656881", padding: 0 };
  },
  input: (provided, state) => {
    return { ...provided, color: "#656881", padding: 0, margin: 0 };
  },
  placeholder: (provided, state) => {
    return { ...provided, color: "#656881", padding: 0, margin: 0 };
  },
  valueContainer: (provided, state) => {
    return { ...provided, padding: 0 };
  },
};

const SelectChain = ({
  className,
  required = false,
  title,
  options,
  name,
  placeholder,
  error,
  register,
  setValue,
}) => {
  return (
    <div className={`${className || ""} flex flex-col`}>
      <span
        className={`${
          title ? "mb-4 " : "mb-0"
        } font-montserrat_semi_bold sm:text-lg text-base text-white`}
      >
        {title}
        {required && (
          <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
            *
          </span>
        )}
      </span>
      <div className="relative">
        <Select
          {...register(name)}
          className="w-full placeholder:text-sm placeholder:sm:text-base sm:text-base text-sm font-montserrat text-white placeholder:text-grey-7"
          placeholder={placeholder}
          options={options.map((item, index) => {
            return {
              label: item.name,
              value: item.name,
              key: item._id,
            };
          })}
          onChange={(e) => {
            setValue(name, e.key, { shouldValidate: true });
          }}
          components={{ DropdownIndicator }}
          styles={customStyles}
        />
        {error && <YupErrorMessage message={error.message} />}
      </div>
    </div>
  );
};

export default React.memo(SelectChain);
