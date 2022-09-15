import React from "react";
import { ScanJob } from "../../../../assets";
import logo from "../../../../assets/images/company/comp1.png";
import Button from "../../../global/Button";

const JobExcerpt = ({ data }) => {
  const { title, company_name, salary, location } = data;
  const applyJob = () => {
    // TODO: Apply for the job
  };
  return (
    <div
      className="flex flex-row flex-wrap w-full h-[180px] items-center pl-4 pr-8 py-4 gap-12 bg-box-bg rounded-lg"
      style={{
        boxShadow:
          "0px 10px 15px rgba(96, 111, 134, 0.11), 0px 4px 6px rgba(96, 111, 134, 0.02)",
      }}
    >
      <img src={logo} className="w-[100px] h-[100px]" alt={company_name} />
      <div className="flex flex-1 flex-col h-full justify-between">
        <p className="text-xl text-grey-1 font-poppins_semi_bold">{title}</p>
        <div className="flex flex-row">
          <img src={ScanJob.IcCompany} alt="" />
          <p className="text-hint text-base font-poppins pl-[2px]">Company:</p>
          <p className="text-grey-1 text-base font-poppins_medium ml-[6px]">
            {company_name}
          </p>
        </div>
        <div className="flex flex-row">
          <img src={ScanJob.IcMoney} alt="" />
          <p className="text-hint text-base font-poppins pl-[2px]">Salary:</p>
          <p className="text-primary text-base font-poppins_medium ml-[6px]">
            {salary}
          </p>
        </div>
        <div className="flex flex-row">
          <img src={ScanJob.IcLocation} alt="" />
          <p className="text-hint text-base font-poppins pl-[2px]">Location:</p>
          <p className="text-grey-1 text-base font-poppins_medium ml-[6px]">
            {location}
          </p>
        </div>
      </div>
      <Button title="Apply" onClickBtn={applyJob} />
    </div>
  );
};

export default React.memo(JobExcerpt);
