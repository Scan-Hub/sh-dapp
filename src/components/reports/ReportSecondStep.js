const ReportSecondStep = ({ reportContentList, handleCheckClick }) => {
  return (
    <div className="flex flex-col space-y-4">
      <span className="font-montserrat text-sm text-[#ADB2DB]">
        Select one or more reasons for the report
      </span>
      {reportContentList.map((item, index) => (
        <div key={index} className="flex items-center">
          <input
            id={index}
            type="checkbox"
            value={item}
            className="form-checkbox w-4 h-4 text-[#00AF71] border border-[#BFBFBF] rounded cursor-pointer"
            onChange={handleCheckClick}
          />
          <label
            htmlFor={index}
            className="ml-3 text-sm font-medium text-white cursor-pointer"
          >
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ReportSecondStep;
