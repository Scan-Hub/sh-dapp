import { reports } from "../../assets";
const ReportSuccess = ({ checkedContent, onChangeReportDescription }) => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <span className="font-montserrat_semi_bold text-base text-white">
        You satisfactorily terminated the complaint!
      </span>
      <img alt="Report Success" src={reports.IcReportSuccess} />
      <span className="text-sm text-[#ADB2DB]">
        Remember that your report can be seen on the scanner, users can value
        your report and also file a controversy if it’s no true.
      </span>
    </div>
  );
};

export default ReportSuccess;
