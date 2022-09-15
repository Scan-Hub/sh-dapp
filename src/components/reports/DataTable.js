import { useNavigate } from "react-router-dom";
import ChanceBeingScam from "./ChanceBeingScam";
import { selectListFormTypes } from "../../reducers/metadata.reducer";
import { fetchFormTypes } from "../../actions";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import { reports } from "../../assets";
import { fCurrency, fNumber } from "../../utils/formatNumber";
import { TailSpin } from "react-loading-icons";
import clsx from "clsx";

const DataTable = ({ loading, tableData, currentPage }) => {
  const tableHead = [
    { className: "text-left min-w-0 xl:w-[5%]", name: "#" },
    { className: "text-left min-w-[140px] xl:w-[18%]", name: "Project name" },
    {
      className: "text-center xl:text-left min-w-[120px] xl:w-[12%]",
      name: "Chain",
    },
    { className: "text-left min-w-[100px] xl:w-[8%]", name: "Price" },
    { className: "text-left min-w-[120px] xl:w-[14%]", name: "Change 24h" },
    { className: "text-left min-w-[120px] xl:w-[11%]", name: "Market Cap" },
    { className: "text-center min-w-[90px] xl:w-[9%]", name: "Holders" },
    { className: "text-center min-w-[94px] xl:w-[6%]", name: "Votes" },
    { className: "text-center min-w-[70px] xl:w-[9%]", name: "Point" },
    {
      className: "text-center min-w-[215px] xl:w-[5%]",
      name: "Chance of Being Scam",
    },
  ];

  const navigate = useNavigate();
  const onRowClick = (id) => {
    navigate(`/report/${id}`);
  };

  const listFormTypes = useSelector(selectListFormTypes);
  const chainOptions = useMemo(() => {
    return listFormTypes.items.filter((r) => r.type === "chain");
  }, [listFormTypes]);

  const getChain = (smartContract) => {
    if (smartContract?.length > 0) {
      const chain = chainOptions.find((c) => c._id === smartContract[0].chain);
      return (
        <div className="flex flex-row items-center space-x-2">
          <img src={chain?.logo} alt="Logo" className="w-6 h-6" />
          <span className="text-base text-white">{chain?.name}</span>
        </div>
      );
    }
    return "-";
  };
  const getMarketCap = (latestPrice) => {
    if (latestPrice?.length > 0) {
      let mc = get(latestPrice, "0.data.0.market_cap", 0);
      return <div className="text-base text-white">{fCurrency(mc)}</div>;
    }
    return "-";
  };
  const getPrice = (latestPrice) => {
    if (latestPrice?.length > 0) {
      let price = get(latestPrice, "0.data.0.price", 0);
      return price === 0 ? "-" : fCurrency(price);
    }
    return "-";
  };
  const getChange24h = (latestPrice) => {
    if (latestPrice?.length > 0) {
      let percent_change_24h = get(
        latestPrice,
        "0.data.0.percent_change_24h",
        0
      );
      return percent_change_24h === 0 ? (
        "-"
      ) : (
        <div className="flex flex-row items-center space-x-2">
          <img
            src={percent_change_24h < 0 ? reports.IcDown : reports.IcUp}
            alt="Change 24h"
          />
          <span
            className={`text-base ${
              percent_change_24h < 0 ? "text-[#F5222D]" : "text-[#A0D911]"
            }`}
          >
            {percent_change_24h.toFixed(2)}
          </span>
        </div>
      );
    }
    return "-";
  };
  const getHolder = (holders) => {
    if (holders?.length > 0) {
      let holder = get(holders, "0.holders", 0);
      return holder;
    }
    return "-";
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFormTypes());
  }, []);
  return (
    <div
      className={clsx(
        "relative flex flex-col space-y-[10px] overflow-x-scroll xl:overflow-x-hidden",
        {
          "min-h-[745px]": loading,
        }
      )}
    >
      {loading && (
        <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center bg-black/40 text-green-text-profile z-10">
          <TailSpin className="mb-2" fill="#00AF71" stroke="#00AF71" />
          Loading...
        </div>
      )}
      <table className="table-auto report__data-table w-full xl:p-4">
        <thead>
          <tr>
            {tableHead.map((item, index) => (
              <th key={index} className={item.className}>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData?.map((item, index) => (
              <tr
                key={index}
                className="border_style"
                onClick={() => onRowClick(item?._id)}
              >
                <td className="font-poppins text-[#FFFFFF] text-[14px] leading-[20px] font-[400] md:left-0">
                  {(currentPage - 1) * 5 + index + 1}
                </td>
                <td className="sticky left-0 min-w-[22%]">
                  <div className="flex flex-row w-full space-x-4">
                    <img
                      src={item.project_logo}
                      alt="Logo"
                      className="w-12 h-12"
                    />
                    <div className="flex flex-col w-full space-y-1">
                      <span className="font-poppins_semi_bold text-base text-white">
                        {item.project_name}
                      </span>
                      <span className="font-poppins_semi_bold text-sm text-[#656881]">
                        {item.token_name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="">{getChain(item?.smart_contracts)}</td>
                <td className="text-left">
                  {getPrice(item?.latest_price_report)}
                </td>
                <td className="text-left text-base ">
                  {getChange24h(item?.latest_price_report)}
                </td>
                <td className="text-left">
                  {getMarketCap(item?.latest_price_report)}
                </td>
                <td className="text-center text-base text-white">
                  {getHolder(item?.holders)}
                </td>
                <td className="text-center text-base text-white">
                  {item?.total_vote || "-"}
                </td>
                <td className="text-center text-base text-white">
                  {item?.point || "-"}
                </td>
                <td className="text-center text-base text-white">
                  <ChanceBeingScam percent={item?.chanceScam || "0.5"} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
