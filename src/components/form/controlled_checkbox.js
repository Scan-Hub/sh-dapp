import { Controller } from "react-hook-form"
import PropTypes from "prop-types"
import clsx from "clsx"

function ControlledCheckbox(props) {
  const {
    control,
    name,
    label,
    labelClassName,
    checkboxClassName,
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
          <div className="sh_control_checkbox">
            <input
              id={id}
              type="checkbox"
              className={clsx("form-checkbox mr-3", checkboxClassName)}
              {...field}
            />
            <label
              htmlFor={id}
              className="text--regular font-medium cursor-pointer min-w-[110px]"
            >
              {text}
            </label>
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

ControlledCheckbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string
}

export default ControlledCheckbox
