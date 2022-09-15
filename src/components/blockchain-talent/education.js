import React from "react"
import clsx from "clsx"
import { Controller } from "react-hook-form"

import ControlledTextField from "../form/controlled_text_field"
import ControlledSelect from "../form/controlled_select"
import ControlledUploadFile from "../form/controlled_upload_file"

const BlockchainTalentEducation = (props) => {
  const { className, formProps } = props
  const { control } = formProps

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
          Education
        </div>
        <div className="flex gap-x-[48px] mb-6">
          <div className="basis-1/2 flex flex-col gap-y-6">
            <ControlledTextField
              color="dark"
              control={control}
              required
              label="School"
              placeholder="Ex: Open University"
              name="school"
            />
            <ControlledSelect
              color="dark"
              label="Degree"
              required
              options={[]}
              control={control}
              placeholder={"Select"}
              name="degree"
            />
            <ControlledTextField
              color="dark"
              control={control}
              required
              label="Field of Study"
              placeholder="Ex: Bussines Administration"
              name="field_of_study"
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
            <ControlledSelect
              color="dark"
              label="Grade"
              control={control}
              options={[]}
              placeholder={"Select"}
              name="grade"
            />
          </div>
        </div>
        <Controller
          name="certificate"
          control={control}
          render={({ field, formState: { errors } }) => (
            <ControlledUploadFile
              label="Certificate"
              errors={errors["certificate"]}
              onChange={(path) => {
                field.onChange({
                  target: {
                    name: "certificate",
                    value: path
                  }
                })
              }}
            />
          )}
        />
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

export default BlockchainTalentEducation
