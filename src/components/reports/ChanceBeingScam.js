const ChanceBeingScam = ({ percent }) => {
  const position = Math.round(Number(percent) * 100);
  return (
    <div className="relative flex flex-row justify-center items-center space-x-[2px]">
      <div className="flex flex-row items-center relative">
        <div className="h-2 w-11 bg-[#F5222D] rounded-[6px_0px_0px_6px]"></div>
        <div className="h-2 w-11 bg-[#CF1322]"></div>
        <div className="h-2 w-11 bg-[#018455]"></div>
        <div className="h-2 w-11 bg-[#00AF71] rounded-[0px_6px_6px_0px]"></div>
        <div
          className={`absolute w-[10px] h-[10px] bg-white rounded-full`}
          style={{ left: `${position}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ChanceBeingScam;
