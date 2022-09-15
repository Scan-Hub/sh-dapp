import React from "react"
import { useForm } from "react-hook-form"
import { applyCompanySchema } from "../../_helpers/utils/schema"
import { yupResolver } from "@hookform/resolvers/yup"

import CompanyTab from "./tab"

const BlockchainTalentForm = () => {
  const formProps = useForm({
    defaultValues: {
      company_name: "",
      company_country: "",
      company_location: "",
      company_email: "",
      company_phone: "",
      numOfEmployees: "",
      company_portfolio: [{}],
      company_team_members: [{}],
      company_partners: [{}],
      businessCertificate: "",
      members: [{}],
      community: {
        telegram: "",
        twitter: "",
        discord: "",
        medium: ""
      }
    },
    resolver: yupResolver(applyCompanySchema),
    shouldFocusError: true
  })
  const { handleSubmit } = formProps

  const onSubmit = (data) => console.log(data)

  return (
    <div className="w-full">
      <div className="text--semibold-3xl text-green-text-profile text-center mb-[60px]">
        Blockchain Talent
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CompanyTab formProps={formProps} />
        <div className="sm:mt-12 mt-10 flex flex-row w-full justify-center">
          <button
            className="sm:px-20 px-10 sm:py-3 py-[6px] rounded-[32px] bg-btn-bg text-white font-montserrat font-bold text-base"
            type="submit"
          >
            {"Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlockchainTalentForm
