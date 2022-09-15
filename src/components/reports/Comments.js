import { reports } from "../../assets";

const Comments = ({ data }) => {
  const colorData = ["#00AF71", "#E26B45", "#FFC132", "#7C7BF5"];
  return (
    <div className="flex flex-col p-8 bg-[#191B2A] rounded-lg lg:rounded-2xl">
      <div className="flex flex-row items-start">
        <img alt="User" src={data?.avatar} className="w-12 h-12" />
        <div className="flex flex-col ml-4">
          <div className="flex flex-row items-center space-x-2">
            <span className="font-montserrat_semi_bold text-base text-white">
              {data.address}
            </span>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span className="text-sm text-[#BFBFBF]">{data.date}</span>
          </div>

          <div className="flex flex-col space-y-4 mt-6">
            {data.comments.map((item, index) => (
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
          </div>
          <span className="mt-4 font-montserrat_semi_bold text-sm text-[#ADB2DB]">
            Love it! Awesome job. Thanks for sharing
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start sm:justify-end space-x-12 mt-5 lg:mt-0 ml-4 lg:ml-0">
        <div className="flex flex-row items-center space-x-[10px]">
          <img
            alt=""
            src={reports.IcControversy}
            className="w-6 h-6 cursor-pointer"
          />
          <span className="text-base text-white">Controversy</span>
        </div>
        <div className="flex flex-row items-center space-x-[10px]">
          <img
            alt=""
            src={reports.IcLike}
            className="w-[18px] h-[19px] cursor-pointer"
          />
          <span className="text-base text-white">10</span>
        </div>
        <div className="flex flex-row items-center space-x-[10px]">
          <img
            alt=""
            src={reports.IcDislike}
            className="w-[18px] h-[19px] cursor-pointer"
          />
          <span className="text-base text-white">0</span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
