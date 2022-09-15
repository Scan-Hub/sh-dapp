import React, { useState } from "react"
import { Controller } from "react-hook-form"
import clsx from "clsx"
import PropTypes from "prop-types"

import { reports } from "../../assets"

const Tag = ({ selected, option, onSelect, onRemove }) => (
  <div
    className={`flex items-center gap-x-2.5 h-[36px] py-1.5 px-2.5 text--regular font-medium rounded-lg cursor-pointer ${
      selected ? "bg-[#00ca921a] text-[#00AF71]" : "bg-[#65688133] text-white"
    }`}
    onClick={onSelect}
  >
    {option.label}
    {onRemove && (
      <span className="close text-[#BFBFBF] cursor-pointer" onClick={onRemove}>
        <img
          src={reports.IcCLose}
          width={16}
          height={16}
          style={{
            fill: "#BFBFBF"
          }}
          alt="ic_remove"
        />
      </span>
    )}
  </div>
)

const ControlledSelectTags = (props) => {
  const {
    className,
    selectClassName,
    label,
    name,
    control,
    required,
    options = [],
    optionValue,
    optionLabel
  } = props
  const [selected, setSelected] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const [suggestionOptions, setSuggestionOptions] = useState([])

  const suggestionOptionsLength = suggestionOptions.length

  const selectedIndex = (option) =>
    selected.findIndex((s) => s[optionValue] === option[optionValue])

  const isSelected = (option) => selectedIndex(option) > -1

  const isMatchOption = (option) =>
    option[optionLabel].toUpperCase().includes(searchValue.toUpperCase())

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchValue(e.target.value)
    if (!value) {
      setSuggestionOptions([])
      return
    }
    setSuggestionOptions(
      options.filter((option) =>
        option[optionLabel].toUpperCase().includes(searchValue.toUpperCase())
      )
    )
  }

  const handleSelectTag = (option, fieldChange) => {
    const currentIndex = selectedIndex(option)
    const nextSelected = [...selected]
    if (currentIndex === -1) {
      nextSelected.push(option)
    } else {
      nextSelected.splice(currentIndex, 1)
    }
    setSelected(nextSelected)
    setSearchValue("")
    setSuggestionOptions([])
    /**
     * * Callback and store value to form state
     */
    fieldChange({
      target: {
        name,
        value: nextSelected
      }
    })
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <div className={clsx("relative", className)}>
          <div className="font-montserrat_semi_bold text-lg text-white mb-3">
            {label}
            {required && (
              <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
                *
              </span>
            )}
          </div>
          <div
            className={clsx(
              "relative h-[48px] flex flex-wrap px-4 py-1.5 bg-[#191B2A] rounded-lg gap-x-2.5 gap-y-2 ",
              selectClassName
            )}
          >
            {selected.map((option) => (
              <Tag
                key={option[optionValue]}
                option={option}
                selected={isSelected(option)}
                onSelect={() => {
                  handleSelectTag(option, field.onChange)
                }}
                onRemove={() => {
                  handleSelectTag(option, field.onChange)
                }}
              />
            ))}
            <div className="inline-flex grow">
              <input
                className="bg-transparent w-full text--regular text-white font-medium focus:outline-none "
                type="text"
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
            {suggestionOptionsLength > 0 && (
              <div className="absolute w-full min-h-[72px] left-0 top-0 bg-[#191B2A] rounded-lg mt-[54px] p-4 z-50">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-montserrat_medium text-base text-[#656881]">
                    Suggestion
                  </span>
                  {suggestionOptions.map((option) => (
                    <Tag
                      key={option[optionValue]}
                      option={option}
                      selected={isMatchOption(option)}
                      onSelect={() => {
                        handleSelectTag(option, field.onChange)
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
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

ControlledSelectTags.propTypes = {
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
  optionValue: PropTypes.string.isRequired,
  optionLabel: PropTypes.string.isRequired
}

export default ControlledSelectTags
