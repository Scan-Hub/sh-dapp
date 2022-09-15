import { Controller } from "react-hook-form"
import PropTypes from "prop-types"
import Select, { components } from "react-select"
import clsx from "clsx"

import { vcs } from "../../assets"

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={vcs.IcArrowBot} alt="" />
    </components.DropdownIndicator>
  )
}

const shStyles = {
  control: (base, state) => ({
    ...base,
    background: "#191B2A",
    width: "100%",
    border: 0,
    boxShadow: "none",
    padding: "12px 16px",
    borderRadius: "8px"
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: "6px",
    padding: 0,
    background: "#191B2A"
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: "#191B2A",
      ":hover": {
        background: "rgba(101, 104, 129, 0.2)"
      },
      cursor: "pointer",
      border: null, // tried border: 'none'
      boxShadow: null, // tried border: 'none'
      outline: 0
    }
  },
  singleValue: (provided, state) => {
    return { ...provided, color: "#656881" }
  },
  indicatorSeparator: (provided, state) => {
    return { ...provided, width: 0 }
  },
  indicatorsContainer: (provided, state) => {
    return { ...provided, color: "#656881", padding: 0 }
  },
  input: (provided, state) => {
    return { ...provided, color: "#656881", padding: 0, margin: 0 }
  },
  placeholder: (provided, state) => {
    return { ...provided, color: "#656881", padding: 0, margin: 0 }
  },
  valueContainer: (provided, state) => {
    return { ...provided, padding: 0 }
  }
}

function ControlledSelect(props) {
  const {
    control,
    name,
    label,
    options = [],
    required,
    icon,
    className,
    labelClassName,
    selectClassName,
    layout = "horizontal",
    color = "light",
    placeholder
  } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <div
          className={clsx("sh_text_field", className, {
            [layout]: layout,
            [color]: color
          })}
        >
          {label && (
            <label
              className={clsx(labelClassName, {
                has_icon: icon
              })}
            >
              {icon && <img src={icon} className="icon" alt="icon" />}
              {label}
              {required && <span className="asterisk">*</span>}
            </label>
          )}
          <Select
            classNamePrefix="cus-react-select"
            className={clsx("w-full", selectClassName)}
            placeholder={placeholder}
            options={options}
            value={field.value}
            onChange={(e) => {
              field.onChange({
                target: {
                  name,
                  value: e.value
                }
              })
            }}
            components={{ DropdownIndicator }}
            styles={shStyles}
          />
          {Boolean(errors[name]) && (
            <div
              className={`help_text ${Boolean(errors[name]) ? "error" : ""}`}
            >
              {errors[name] && errors[name].message}
            </div>
          )}
        </div>
      )}
    />
  )
}

ControlledSelect.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })
  ),
  icon: PropTypes.string,
  layout: PropTypes.oneOf(["inline", "horizontal"]),
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  labelClassName: PropTypes.string
}

export default ControlledSelect
