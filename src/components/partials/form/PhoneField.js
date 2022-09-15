import React from "react";
import { vcs } from "../../../assets";
import Select, { components } from "react-select";
import YupErrorMessage from "../../global/YupErrorMessage";
import PropTypes from "prop-types";
import data from "../../../assets/countries/countries.json";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={vcs.IcArrowBot} alt="" />
    </components.DropdownIndicator>
  );
};
const formatOptionLabel = ({ code, flag, dial_code }) => (
  <div className="flex flex-row items-center w-full h-full">
    <p className="text-2xl">{flag}</p>
    <img src={vcs.IcArrowBotFill} alt="Country" className="pl-[6px]" />
    <span className="font-montserrat_medium text-base text-white pl-3">
      {dial_code || ""}
    </span>
  </div>
);
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#191B2A",
    // width: "100%",
    border: 0,
    boxShadow: "none",
    width: "auto",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: "6px",
    padding: 0,
    background: "#191B2A",
    width: "300px",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: "#191B2A",
      ":hover": {
        background: "rgba(101, 104, 129, 0.2)",
      },
      cursor: "pointer",
      border: null,
      boxShadow: null,
      outline: 0,
      // overflow: "hidden",
    };
  },
  singleValue: (provided, state) => {
    return { ...provided, color: "#656881", width: "fit-content" };
  },
  indicatorSeparator: (provided, state) => {
    return { ...provided, width: 0 };
  },
  indicatorsContainer: (provided, state) => {
    return { ...provided, color: "#656881", padding: 0, width: 0, height: 0 };
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
  // menuList: (provided, state) => {
  //   return { ...provided, width: "300px" };
  // },
};

const PhoneField = (props) => {
  const { required, className, onChange, value, error, title, placeHolder } =
    props;

  const onSelectPrefix = (value) => {
    onChange({ code: value.code, dial_code: value.dial_code }, "prefix");
  };

  return (
    <div className={`${className} flex flex-col space-y-3`}>
      <span className="font-montserrat_semi_bold text-lg text-white">
        {title}
        {required && (
          <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
            *
          </span>
        )}
      </span>
      <div className="relative flex flex-row items-center py-3 px-4 bg-[#191B2A] h-[48px] rounded-lg">
        <Select
          options={data.map((item) => {
            return {
              label: item.dial_code + item.name + item.code,
              code: item.code,
              name: item.name,
              dial_code: item.dial_code,
              flag: item.flag,
            };
          })}
          defaultValue={{
            name: "United States",
            code: "US",
            dial_code: "+1",
            flag: "🇺🇸",
          }}
          formatOptionLabel={formatOptionLabel}
          onChange={(e) => onSelectPrefix(e)}
          components={{ DropdownIndicator }}
          styles={customStyles}
        />
        <input
          type="text"
          placeholder={placeHolder}
          className="w-auto ml-4 bg-transparent placeholder:text-sm placeholder:sm:text-base sm:text-base text-sm text-white focus:outline-none"
          autoComplete="off"
          value={value?.number}
          onChange={(e) => onChange({ number: e.target.value }, "number")}
        />
        {error && <YupErrorMessage message={error.message} />}
      </div>
    </div>
  );
};

PhoneField.propTypes = {
  required: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object,
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
};

export default PhoneField;
