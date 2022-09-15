import { reports } from "../../assets";

const ReportFirstStep = ({
  listTokenFilter,
  onSearchValueChange,
  onSelectTokenToReport,
}) => {
  return (
    <div className="space-y-4 pb-4">
      <p className="desc mb-4 block">
        Enter the token contract, the complaints will appear publicly in the
        Scanner section and the users can assess your complaint or contradict.
      </p>
      <div className="flex flex-row border border-[#FFFFFF] rounded-lg p-[10px_16px] h-12 mx-auto ">
        <img
          alt=""
          src={reports.IcSearch}
          className="cursor-pointer w-[24px]"
        />
        <input
          className="w-full bg-transparent focus:outline-none font-poppins pl-4 appearance-none text-sm text-[#F5F5F5] placeholder-[[#656881]]"
          type="text"
          placeholder={"Search by address or name"}
          onChange={(e) => onSearchValueChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-7 pt-8">
        {listTokenFilter.map((item, index) => (
          <div
            key={index}
            className="flex flex-row space-x-4 cursor-pointer"
            onClick={() => onSelectTokenToReport(item.tokenName)}
          >
            <img alt="Symbol" src={item.iconSymbol} />
            <div className="flex flex-col space-y-[2px]">
              <span className="font-poppins_semi_bold text-base text-white">
                {item.title}
              </span>
              <span className="font-poppins_semi_bold text-sm text-[#656881]">
                {item.tokenName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportFirstStep;
