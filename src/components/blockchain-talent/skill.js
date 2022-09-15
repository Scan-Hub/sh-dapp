import React, { useMemo } from "react"
import clsx from "clsx"
import ControlledSelectTags from "../form/controlled_select_tags"

const BlockchainTalentSkill = (props) => {
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
      <div className="flex flex-col gap-y-6">
        <ControlledSelectTags
          label="Skill"
          name="skill"
          control={control}
          required
          options={industryOptions}
          value={[]}
          optionLabel="label"
          optionValue="value"
        />
        <ControlledSelectTags
          label="English Proficiency"
          name="english_proficiency"
          control={control}
          required
          options={industryOptions}
          value={[]}
          optionLabel="label"
          optionValue="value"
        />
        <ControlledSelectTags
          label="Other Languages"
          name="other_languages"
          control={control}
          options={industryOptions}
          value={[]}
          optionLabel="label"
          optionValue="value"
        />
      </div>
    </div>
  )
}

export default BlockchainTalentSkill
