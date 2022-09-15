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
import IcLock from "../../assets/images/company/ic_lock.svg"

import SelectPhone from "../global/SelectPhone"

import ControlledTextField from "../form/controlled_text_field"
import ControlledUploadImage from "../form/controlled_upload_image"
import ControlledCheckbox from "../form/controlled_checkbox"
import ControlledSelect from "../form/controlled_select"

const BlockchainTalentDescription = (props) => {
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
      <div className="flex gap-x-[48px]">
        <div className="">
          <Controller
            name="talent_avatar"
            control={control}
            render={({ field, formState: { errors } }) => (
              <ControlledUploadImage
                required
                width={214}
                height={214}
                title="Upload avatar"
                errors={errors["talent_avatar"]}
                onChange={(path) => {
                  field.onChange({
                    target: {
                      name: "talent_avatar",
                      value: path
                    }
                  })
                }}
              />
            )}
          />
        </div>
        <div className="grow flex flex-col gap-y-6">
          <div className="flex flex-row gap-x-6">
            <ControlledTextField
              control={control}
              required
              label="First name"
              placeholder="Enter name"
              name="talent_first_name"
            />
            <ControlledTextField
              control={control}
              required
              label="Last name"
              placeholder="Enter name"
              name="talent_last_name"
            />
          </div>
          <div className="flex flex-row gap-x-6">
            <ControlledSelect
              required
              label="D.O.B"
              control={control}
              options={[]}
              placeholder={"Select"}
              name="talent_gender"
            />
            <ControlledSelect
              required
              label="Gender"
              control={control}
              options={[]}
              placeholder={"Select"}
              name="talent_gender"
            />
          </div>
          <div className="flex flex-row gap-x-6 items-end">
            <ControlledSelect
              required
              label="Location"
              control={control}
              options={listCountriesISO.items || []}
              placeholder={"Enter country"}
              name="talent_location"
              className="grow"
            />
            <ControlledSelect
              label=""
              control={control}
              options={[]}
              placeholder={"Select"}
              name="talent_location_province"
            />
          </div>
          <ControlledTextField
            control={control}
            required
            label="Email"
            placeholder="Enter email"
            name="company_email"
          />
          {listCountriesFlagDial && (
            <div className="flex flex-row items-end relative">
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
              <img
                className="absolute right-[-32px]"
                src={IcLock}
                alt="ic_lock"
              />
            </div>
          )}

          <ControlledSelect
            required
            label="Primary Job Title"
            control={control}
            options={[]}
            placeholder={"Select"}
            name="talent_job"
          />

          <ControlledCheckbox
            control={control}
            label=""
            name="open"
            text="I am open to a new job"
            id="talent_open"
            labelClassName="!text-base"
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

export default BlockchainTalentDescription
