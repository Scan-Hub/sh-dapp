import React, { useMemo } from "react"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { Controller } from "react-hook-form"
import {
  selectcountriesFlagDial,
  selectcountriesISO
} from "../../reducers/countries.reducer"

import IcTelegram from "../../assets/images/profile/telegram.svg"
import IcTwitter from "../../assets/images/profile/twitter.svg"
import IcDiscord from "../../assets/images/company/ic_discord_round.svg"
import IcMedium from "../../assets/images/company/ic_medium_round.svg"
import IcInfoCircle from "../../assets/images/company/ic_info_circle.svg"
import IcLock from "../../assets/images/company/ic_lock.svg"

import SelectPhone from "../global/SelectPhone"

import ControlledTextField from "../form/controlled_text_field"
import ControlledUploadImage from "../form/controlled_upload_image"
import ControlledUploadFile from "../form/controlled_upload_file"
import ControlledSelect from "../form/controlled_select"
import ControlledSelectTags from "../form/controlled_select_tags"

const CompanyDescription = (props) => {
  const { className, formProps } = props
  const {
    control,
    register,
    reset,
    setValue,
    formState: { errors }
  } = formProps
  const listCountriesISO = useSelector(selectcountriesISO)
  const listCountriesFlagDial = useSelector(selectcountriesFlagDial)

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
      <div className="flex gap-x-[60px]">
        <div className="basis-1/2 flex flex-col gap-y-6">
          <Controller
            name="company_logo"
            control={control}
            render={({ field, formState: { errors } }) => (
              <ControlledUploadImage
                required
                label="Company Logo"
                width={214}
                height={214}
                errors={errors["company_logo"]}
                onChange={(path) => {
                  field.onChange({
                    target: {
                      name: "company_logo",
                      value: path
                    }
                  })
                }}
              />
            )}
          />
          <ControlledTextField
            control={control}
            required
            label="Company name"
            placeholder="Enter company name"
            name="company_name"
          />
          <ControlledTextField
            control={control}
            required
            label="Website"
            placeholder="Enter link"
            name="company_web"
            endAdornment={<img className="ml-4" src={IcLock} alt="ic_lock" />}
          />
          <div className="flex flex-row items-end">
            <ControlledSelect
              required
              label="Country"
              control={control}
              options={listCountriesISO.items || []}
              placeholder={"Enter country"}
              name="company_country"
              className="grow"
            />
            <img className="ml-4 mb-4" src={IcLock} alt="ic_lock" />
          </div>
          <ControlledTextField
            control={control}
            required
            label="Location"
            placeholder="Enter location"
            name="company_location"
            endAdornment={<img className="ml-4" src={IcLock} alt="ic_lock" />}
          />
          <ControlledTextField
            control={control}
            required
            label="Email"
            placeholder="Enter email"
            name="company_email"
            endAdornment={<img className="ml-4" src={IcLock} alt="ic_lock" />}
          />
          {listCountriesFlagDial && (
            <div className="flex flex-row items-end">
              <SelectPhone
                className="grow"
                reset={reset}
                register={register}
                setValue={setValue}
                title={"Phone"}
                options={listCountriesFlagDial?.items}
                name={"company_phone"}
                placeholder={"Enter phone number"}
                error={errors.company_phone}
                control={control}
              />
              <img className="ml-4 mb-4" src={IcLock} alt="ic_lock" />
            </div>
          )}

          <Controller
            name="business_license"
            control={control}
            render={({ field, formState: { errors } }) => (
              <ControlledUploadFile
                label="Business registration certificate"
                errors={errors["business_license"]}
                onChange={(path) => {
                  field.onChange({
                    target: {
                      name: "business_license",
                      value: path
                    }
                  })
                }}
              />
            )}
          />
        </div>
        <div className="basis-1/2 flex flex-col gap-y-6">
          <div className="flex flex-row items-end justify-between">
            <Controller
              name="founder_id"
              control={control}
              render={({ field, formState: { errors } }) => (
                <ControlledUploadImage
                  label={
                    <div className="flex flex-row items-center gap-x-1">
                      <span>Founder ID</span>
                      <span>
                        <img src={IcInfoCircle} alt="info_circle" />
                      </span>
                    </div>
                  }
                  title="Upload your ID"
                  caption="(.JPEG/ .JPG/ .PNG)"
                  width={214}
                  height={214}
                  errors={errors["founder_id"]}
                  onChange={(path) => {
                    field.onChange({
                      target: {
                        name: "founder_id",
                        value: path
                      }
                    })
                  }}
                />
              )}
            />
            <Controller
              name="founder_id_1"
              control={control}
              render={({ field, formState: { errors } }) => (
                <ControlledUploadImage
                  title="Upload your ID"
                  caption="(.JPEG/ .JPG/ .PNG)"
                  width={214}
                  height={214}
                  errors={errors["founder_id_1"]}
                  onChange={(path) => {
                    field.onChange({
                      target: {
                        name: "founder_id_1",
                        value: path
                      }
                    })
                  }}
                />
              )}
            />
          </div>
          <ControlledTextField
            control={control}
            required
            label="Founded Date"
            placeholder="Enter Date"
            name="company_founded_date"
            endAdornment={<img className="ml-4" src={IcLock} alt="ic_lock" />}
          />
          <div className="flex flex-row items-end">
            <ControlledSelect
              required
              label="Number of employees"
              control={control}
              options={[]}
              placeholder={"Select num employees"}
              name="company_num_employees"
            />
            <img className="ml-4 mb-4" src={IcLock} alt="ic_lock" />
          </div>

          <div className="flex flex-row items-end">
            <ControlledSelectTags
              className="grow"
              label="Industry"
              name="company_industry"
              control={control}
              required
              options={industryOptions}
              value={[]}
              optionLabel="label"
              optionValue="value"
            />
            <img className="ml-4 mb-4" src={IcLock} alt="ic_lock" />
          </div>
          <ControlledSelect
            required
            label="Operating Status"
            control={control}
            options={[]}
            placeholder={"Select operation status"}
            name="company_operation_status"
            className="pr-8"
          />
        </div>
      </div>

      <div className="sm:mt-12 mt-10 mb-[60px] flex flex-row w-full items-end space-x-4">
        <ControlledTextField
          control={control}
          label="Community"
          startAdornment={<img src={IcTelegram} className="icon" alt="icon" />}
          placeholder="Add Telegram link"
          name="community.telegram"
        />
        <ControlledTextField
          control={control}
          startAdornment={<img src={IcTwitter} className="icon" alt="icon" />}
          placeholder={"Add Twitter link"}
          name="community.twitter"
        />
        <ControlledTextField
          control={control}
          startAdornment={<img src={IcDiscord} className="icon" alt="icon" />}
          placeholder={"Add Discord link"}
          name="community.discord"
        />
        <ControlledTextField
          control={control}
          startAdornment={<img src={IcMedium} className="icon" alt="icon" />}
          placeholder={"Add Medium link"}
          name="community.medium"
        />
      </div>
      <ControlledTextField
        control={control}
        required
        wordsLength={2000}
        label="About Company"
        placeholder="Enter text"
        name="company_about"
        type="textarea"
        inputClassName="min-h-[96px]"
      />
    </div>
  )
}

export default CompanyDescription
