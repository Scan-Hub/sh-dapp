import { Controller } from "react-hook-form"
import PropTypes from "prop-types"
import clsx from "clsx"

function ControlledRadio(props) {
  const {
    control,
    name,
    label,
    labelClassName,
    radioClassName,
    required,
    text,
    id
  } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <div className="sh_control">
          {label && (
            <label className={clsx(labelClassName)}>
              {label}
              {required && <span className="asterisk">*</span>}
            </label>
          )}
          <div className=" min-w-[110px]">
            <div className="sh_cus_radio">
              <input
                id={id}
                name={name}
                type="radio"
                className={clsx("mr-3", radioClassName)}
                {...field}
              />
              <label
                htmlFor={id}
                className="text--regular cursor-pointer min-w-[110px]"
              >
                {text}
              </label>
              <span className="checkmark"></span>
            </div>
          </div>
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

ControlledRadio.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  radioClassName: PropTypes.string,
  labelClassName: PropTypes.string
}

export default ControlledRadio
