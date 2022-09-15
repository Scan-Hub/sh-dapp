import React from "react"
import CompanyForm from "../components/company"

const ApplyCompanyPage = () => {
  return (
    <section className="w-full h-full min-h-screen overflow-y-auto flex flex-col items-center bg-upload-content-bg">
      <div className="container pt-12 pb-14">
        <div className="max-w-[984px] mx-auto">
          <CompanyForm />
        </div>
      </div>
    </section>
  )
}

export default ApplyCompanyPage
