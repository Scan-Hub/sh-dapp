import { Controller } from "react-hook-form"
import PropTypes from "prop-types"
import clsx from "clsx"

function ControlledRangeInput(props) {
  const {
    control,
    name,
    label,
    className,
    labelClassName,
    inputClassName,
    required,
    icon,
    layout = "horizontal",
    color = "light",
    max,
    min
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

          <div className={`relative flex items-center gap-x-4`}>
            <input
              placeholder={"Min"}
              className={clsx(
                "grow focus:ring-1 focus:ring-vbDisableText",
                inputClassName
              )}
              type="number"
              min={min}
              max={max}
              value={field.value[0] || 0}
              onChange={(e) => {
                field.onChange({
                  target: {
                    name,
                    value: [e.target.value, ...field.value]
                  }
                })
              }}
            />
            <span>-</span>
            <input
              type="number"
              placeholder={"Max"}
              className={clsx(
                "grow focus:ring-1 focus:ring-vbDisableText",
                inputClassName
              )}
              min={min}
              max={max}
              value={field.value[1] || 0}
              onChange={(e) => {
                field.onChange({
                  target: {
                    name,
                    value: [...field.value, e.target.value]
                  }
                })
              }}
            />
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

ControlledRangeInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  icon: PropTypes.string,
  layout: PropTypes.oneOf(["inline", "horizontal"]),
  color: PropTypes.oneOf(["light", "dark"]),
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number
}

export default ControlledRangeInput
