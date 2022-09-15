import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesFlagDial, fetchCountriesISO } from "../../actions";
import { selectcountriesFlagDial } from "../../reducers/countries.reducer";
import { vcs } from "../../assets";
import YupErrorMessage from "../global/YupErrorMessage";
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={vcs.IcArrowBot} alt="" />
    </components.DropdownIndicator>
  );
};
const formatOptionLabel = ({ unicodeFlag, dialCode }) => (
  <div className="flex flex-row items-center w-full h-full">
    <p className="text-2xl">{unicodeFlag}</p>
    <img src={vcs.IcArrowBotFill} alt="Country" className="pl-[6px]" />
    <span className="font-montserrat_medium text-base text-white pl-3">
      {(dialCode || "").includes("+") ? dialCode : "+" + dialCode}
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
};

const InputPhoneNumber = (props) => {
  const {
    required,
    className,
    onChange,
    value,
    error,
    title,
    placeHolder,
    disabled = false,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountriesISO());
    dispatch(fetchCountriesFlagDial());
  }, []);
  const listCountriesFlagDial = useSelector(selectcountriesFlagDial);

  const [prefix, setPrefix] = useState("+1");
  const [phone, setPhone] = useState("");

  const onSelectPrefix = (value) => {
    if (value.dialCode.includes("+")) {
      setPrefix(value.dialCode);
      onChange(`${value.dialCode}${phone}`);
    } else {
      setPrefix("+" + value.dialCode);
      onChange(`+${value.dialCode}${phone}`);
    }
  };
  const onSelectPhone = (value) => {
    setPhone(value);
    onChange(`${prefix}${value}`);
  };
  return (
    <div className={`${className} flex flex-col space-y-3`}>
      {title && (
        <span
          className={`${
            disabled ? "text-disabled-text" : "text-white "
          } font-montserrat_semi_bold text-lg`}
        >
          {title}
          {required && (
            <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
              *
            </span>
          )}
        </span>
      )}
      <div className="relative flex flex-row items-center py-3 px-4 bg-[#191B2A] h-[48px] rounded-lg">
        <Select
          isDisabled={disabled}
          options={listCountriesFlagDial?.items}
          // defaultValue={listCountriesFlagDial?.items[0]}
          defaultValue={{
            currency: "USD",
            dialCode: "1",
            unicodeFlag: "🇺🇸",
          }}
          formatOptionLabel={formatOptionLabel}
          onChange={(e) => onSelectPrefix(e)}
          components={{ DropdownIndicator }}
          styles={customStyles}
        />
        <input
          disabled={disabled}
          type="number"
          placeholder={placeHolder}
          className="w-auto ml-4 bg-transparent placeholder:text-sm placeholder:sm:text-base sm:text-base text-sm text-white focus:outline-none"
          autoComplete="off"
          value={value?.number}
          onChange={(e) => onSelectPhone(e.target.value)}
        />
        {error && <YupErrorMessage message={error.message} />}
      </div>
    </div>
  );
};

export default React.memo(InputPhoneNumber);
