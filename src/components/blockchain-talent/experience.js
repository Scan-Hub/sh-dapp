import React, { useMemo } from "react"
import clsx from "clsx"

import ControlledTextField from "../form/controlled_text_field"
import ControlledSelect from "../form/controlled_select"
import ControlledUploadFile from "../form/controlled_upload_file"
import ControlledCheckbox from "../form/controlled_checkbox"
import ControlledSelectTags from "../form/controlled_select_tags"

const BlockchainTalentExperience = (props) => {
  const { className, formProps } = props
  const { control } = formProps

  const industryOptions = useMemo(
    () => [
      { value: "Decentralized Finance", label: "Decentralized Finance" },
      { value: "GameFi", label: "GameFi" },
      { value: "Metaverse", label: "Metaverse" },
      { value: "Exchange", label: "Exchange" },
      { value: "Fintech", label: "Fintech" },
      { value: "Nfts", label: "Nfts" },
      { value: "Media", label: "Media" },
      { value: "Lending", label: "Lending" },
      { value: "Borrow", label: "Borrow" }
    ],
    []
  )

  return (
    <div className={clsx("w-full", className)}>
      <div className="w-full h-[64px] bg-box-bg rounded-2xl mb-4 flex flex-row items-center gap-x-6 px-8">
        <div>
          <div className="w-[32px] h-[32px] rounded-lg bg-green-text-profile text-center align-middle text--semibold-xl">
            +
          </div>
        </div>
        <div className="text--bold-xl">Add New</div>
      </div>
      <div className="p-8 bg-box-bg rounded-2xl">
        <div className="text--bold-xl text-green-text-profile mb-8">
          Experience
        </div>

        <div className="flex gap-x-[48px] mb-6">
          <div className="basis-1/2 flex flex-col gap-y-6">
            <ControlledTextField
              color="dark"
              control={control}
              required
              label="Location"
              placeholder="Enter Address"
              name="location"
            />
            <ControlledTextField
              color="dark"
              control={control}
              required
              label="Company name"
              placeholder="Enter company name"
              name="company_name"
            />
            <ControlledTextField
              color="dark"
              control={control}
              required
              label="Title"
              placeholder="Enter title"
              name="title"
            />
            <ControlledSelect
              color="dark"
              label="Employment Type"
              required
              options={[]}
              control={control}
              placeholder={"Select"}
              name="employment_type"
            />
            <ControlledSelectTags
              label="Industry"
              selectClassName="bg-[#0d0f20]"
              name="company_industry"
              control={control}
              required
              options={industryOptions}
              value={[]}
              optionLabel="label"
              optionValue="value"
            />
          </div>
          <div className="basis-1/2 flex flex-col gap-y-6">
            <div className="flex flex-row items-end gap-x-6">
              <ControlledSelect
                color="dark"
                required
                label="Start Date"
                control={control}
                options={[]}
                placeholder={"Select"}
                name="start_month"
              />
              <ControlledSelect
                color="dark"
                required
                label=""
                control={control}
                options={[]}
                placeholder={"Select"}
                name="start_year"
              />
            </div>
            <div className="flex flex-row items-end gap-x-6">
              <ControlledSelect
                color="dark"
                required
                label="End Date"
                control={control}
                options={[]}
                placeholder={"Select"}
                name="start_month"
              />
              <ControlledSelect
                color="dark"
                required
                label=""
                control={control}
                options={[]}
                placeholder={"Select"}
                name="start_year"
              />
            </div>
            <ControlledCheckbox
              control={control}
              label=""
              name="open"
              text="I am currently working at this place"
              id="talent_current_working"
              labelClassName="!text-base"
            />
          </div>
        </div>
        <div className="sm:mt-12 mt-10 flex flex-row w-full justify-center">
          <button
            className="sm:px-20 px-10 sm:py-3 py-[6px] rounded-[32px] bg-btn-bg text-white font-montserrat font-bold text-base"
            type="submit"
          >
            {"Save"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlockchainTalentExperience
