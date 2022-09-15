import { useState } from "react"
import { Controller } from "react-hook-form"
import PropTypes from "prop-types"
import clsx from "clsx"
import { Range as ReactRange, getTrackBackground } from "react-range"

function ControlledSliderCustom(props) {
  const {
    control,
    name,
    label,
    className,
    labelClassName,
    sliderClassName,
    required,
    icon,
    layout = "horizontal",
    color = "light",
    max = 100,
    min = 0,
    step = 1
  } = props

  const [values, setValues] = useState([min, max])

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
          <div
            className={clsx(
              "flex flex-row flex-wrap justify-center",
              sliderClassName
            )}
          >
            <ReactRange
              values={values}
              step={step}
              min={min}
              max={max}
              onChange={(values) => {
                setValues(values)
                field.onChange({
                  target: {
                    name,
                    value: values
                  }
                })
              }}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "100%"
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "4px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values,
                        colors: ["#ccc", "#00AF71", "#ccc"],
                        min,
                        max
                      }),
                      alignSelf: "center"
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "16px",
                    width: "16px",
                    borderRadius: "16px",
                    outline: "none",
                    backgroundColor: "#00AF71",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div
                    style={{
                      height: "16px",
                      width: "16px",
                      borderRadius: "16px",
                      backgroundColor: isDragged ? "#548BF4" : "#00AF71"
                    }}
                  />
                </div>
              )}
            />
            <output
              className="w-full flex flex-row justify-between text--semibold-sm"
              id="output"
            >
              <span className="font-medium">{values[0]}</span>
              <span>{values[1]}+</span>
            </output>
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

ControlledSliderCustom.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  icon: PropTypes.string,
  layout: PropTypes.oneOf(["inline", "horizontal"]),
  color: PropTypes.oneOf(["light", "dark"]),
  sliderClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number
}

export default ControlledSliderCustom
