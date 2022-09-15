import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { reports } from "../../assets";
import { formatBalanceString } from "../../_helpers/lib";

const REACT_APP_WSS_FEED_URL = process.env.REACT_APP_WSS_FEED_URL;

const MetadataFeedCMC = () => {
  const [fullyDilutedMarketCap, setFullyDilutedMarketCap] = useState(null);
  const [data, setData] = useState(null);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    REACT_APP_WSS_FEED_URL
  );

  // const messageHistory = useRef<MessageEvent[]>([]);

  // messageHistory.current = useMemo(
  // 	() => messageHistory.current.concat(lastJsonMessage ?? []),
  // 	[lastJsonMessage],
  // );

  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "subscribe",
        id: "price",
        data: { cryptoIds: [1765], index: "detail" },
      }),
    [sendJsonMessage]
  );

  const handleClickUnSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "subscribe",
        id: "price",
        data: { cryptoIds: [1765], index: "detail" },
      }),
    [sendJsonMessage]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    handleClickSendMessage();
    console.log("lastJsonMessage", lastJsonMessage);
    if (lastJsonMessage?.d?.cr) {
      setData(lastJsonMessage?.d?.cr);
      setFullyDilutedMarketCap(
        lastJsonMessage?.d?.cr?.fmc
          ? lastJsonMessage.d.cr.fmc
          : lastJsonMessage?.d?.cr?.ts * lastJsonMessage?.d?.cr?.p
      );
    }
  }, [lastJsonMessage]);

  return (
    <div className="flex flex-col">
      <span className="font-montserrat_semi_bold text-sm md:text-base text-[#ffffff80]">
        DATA
      </span>
      <div className="flex flex-wrap sm:grid sm:grid-cols-3 lg:flex lg:flex-wrap xl:grid xl:grid-cols-3 justify-start xl:flex-row sm:gap-x-4 2xl:gap-x-8">
        <div className="col-span-1 flex flex-col p-[16px_24px] bg-[#ffffff0d] rounded-2xl space-y-[6px] mt-4 sm:mr-0">
          <span className="text-sm md:text-base text-[#BFBFBF]">
            Market Cap
          </span>
          <span className="font-montserrat_bold text-sm md:text-base text-white">
            {data?.mc ? formatBalanceString(data.mc) : "0"}
          </span>
          {data?.mc24hpc && (
            <div className="flex flex-row items-center space-x-2">
              <img
                alt="User"
                src={data?.mc24hpc < 0 ? reports.IcDown : reports.IcUp}
              />
              <span
                className="text-sm md:text-base"
                style={{ color: data?.mc24hpc < 0 ? "#F5222D" : "#2EB553" }}
              >
                {data.mc24hpc.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        <div className="col-span-1 flex flex-col p-[16px_24px] bg-[#ffffff0d] rounded-2xl space-y-[6px] mt-4 ml-4 sm:mr-0">
          <span className="text-sm md:text-base text-[#BFBFBF]">
            Fully Diluted Market Cap
          </span>
          <span className="font-montserrat_bold text-sm md:text-base text-white">
            {fullyDilutedMarketCap
              ? formatBalanceString(fullyDilutedMarketCap)
              : "0"}
          </span>
          {fullyDilutedMarketCap && (
            <div className="flex flex-row items-center space-x-2">
              <img
                alt="User"
                src={data?.fmc24hpc < 0 ? reports.IcDown : reports.IcUp}
              />
              <span
                className="text-sm md:text-base"
                style={{ color: data?.fmc24hpc < 0 ? "#F5222D" : "#2EB553" }}
              >
                {data?.fmc24hpc ? data?.fmc24hpc.toFixed(2) : "--"}%
              </span>
            </div>
          )}
        </div>
        <div className="col-span-1 flex flex-col p-[16px_24px] bg-[#ffffff0d] rounded-2xl space-y-[6px] mt-4 ml-4 sm:mr-0">
          <span className="text-sm md:text-base text-[#BFBFBF]">
            Volume 24h
          </span>
          <span className="font-montserrat_bold text-sm md:text-base text-white">
            {data?.v ? formatBalanceString(data.v) : "0"}
          </span>
          {data?.vol24hpc && (
            <div className="flex flex-row items-center space-x-2">
              <img
                alt="User"
                src={data?.vol24hpc < 0 ? reports.IcDown : reports.IcUp}
              />
              <span
                className="text-sm md:text-base"
                style={{ color: data?.vol24hpc < 0 ? "#F5222D" : "#2EB553" }}
              >
                {data.vol24hpc.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        {/* <div className="col-span-2 sm:col-span-1 flex flex-col p-[16px_24px] bg-[#ffffff0d] rounded-2xl space-y-[6px] mt-4 mr-4 xl:mr-8">
            <span className="text-sm md:text-base text-[#BFBFBF]">Holders</span>
            <span className="font-montserrat_bold text-sm md:text-base text-white">
              30.1K
            </span>
          </div> */}
      </div>
    </div>
  );
};

export default MetadataFeedCMC;
