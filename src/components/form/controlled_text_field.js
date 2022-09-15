import { Controller } from "react-hook-form"
import PropTypes from "prop-types"
import clsx from "clsx"

import ReactTyped from "react-typed"
function ControlledTextField(props) {
  const {
    control,
    name,
    label,
    className,
    labelClassName,
    inputClassName,
    wordsLength,
    required,
    placeholder,
    icon,
    type,
    startAdornment,
    endAdornment,
    layout = "horizontal",
    color = "light",
    inputProps,
    placeholderTyped,
    autoComplete
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

              {type === "textarea" && wordsLength ? (
                <span className="text--semibold-sm ml-2 text-[#656881]">
                  ({wordsLength} words)
                </span>
              ) : (
                ""
              )}
            </label>
          )}
          {type === "textarea" ? (
            <textarea
              {...field}
              placeholder={placeholder}
              className={clsx(inputClassName)}
            />
          ) : (
            <div className={`relative flex items-center`}>
              {startAdornment && (
                <div className="absolute left-0 ml-4">{startAdornment}</div>
              )}

              {placeholderTyped ? (
                <ReactTyped
                  loop={true}
                  className="block w-full"
                  loopCount={0}
                  typeSpeed={100}
                  startDelay={0}
                  backSpeed={20}
                  backDelay={1}
                  strings={placeholderTyped}
                  stopped={null}
                  smartBackspace
                  shuffle={false}
                  fadeOut={false}
                  fadeOutDelay={100}
                  attr="placeholder"
                  bindInputFocusEvents={false}
                >
                  <input
                    {...field}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={clsx(
                      "grow focus:ring-1 focus:ring-vbDisableText",
                      {
                        "!pl-14": startAdornment
                      },
                      inputClassName
                    )}
                    {...inputProps}
                  />
                </ReactTyped>
              ) : (
                <input
                  {...field}
                  placeholder={placeholder}
                  className={clsx(
                    "grow focus:ring-1 focus:ring-vbDisableText",
                    {
                      "!pl-14": startAdornment
                    },
                    inputClassName
                  )}
                  {...inputProps}
                />
              )}

              {endAdornment && endAdornment}
            </div>
          )}
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

ControlledTextField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  icon: PropTypes.string,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  layout: PropTypes.oneOf(["inline", "horizontal"]),
  color: PropTypes.oneOf(["light", "dark", "transparent"]),
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  inputProps: PropTypes.object
}

export default ControlledTextField
