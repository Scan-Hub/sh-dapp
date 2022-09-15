const colorData = ["#00AF71", "#E26B45", "#FFC132", "#7C7BF5"];
const ReportThirdStep = ({ checkedContent, onChangeReportDescription }) => {
  const getColor = (index) => {
    let temp = index % colorData.length;
    return colorData[temp];
  };
  return (
    <div className="flex flex-col space-y-4">
      {checkedContent.map((item, index) => (
        <div key={index} className="flex flex-row space-x-3">
          <div
            className="relative w-1 h-4"
            style={{ background: `${colorData[index % 4]}` }}
          ></div>
          <span className="font-montserrat_semi_bold text-sm text-white">
            {item}
          </span>
        </div>
      ))}
      <textarea
        placeholder="Add your report description..."
        className="min-h-[120px] rounded-lg bg-black opacity-[0.32] p-4"
        onChange={(e) => onChangeReportDescription(e.target.value)}
      />
    </div>
  );
};

export default ReportThirdStep;
