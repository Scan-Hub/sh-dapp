import { reports } from "../../assets";
const CommonReports = ({ commonData }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-6 lg:space-y-0 bg-[#191B2A] rounded-lg lg:rounded-3xl p-[24px_32px]">
      <img alt="" src={reports.IcLogo} className="cursor-pointer w-[173px]" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 lg:gap-x-15 gap-y-6">
        {commonData.map((item, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-poppins_semi_bold text-base text-[#ADB2DB]">
              {item.title}
            </span>
            <span className="font-poppins_semi_bold text-base text-[#FFC132]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonReports;
