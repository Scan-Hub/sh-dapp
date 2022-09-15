import React from "react";

import BoxWallet from "../../assets/images/profile/box_wallet.png";
import InfoBoxGreen from "../../assets/images/profile/info_box_green_tall.png";
import InfoBoxYellow from "../../assets/images/profile/info_box_yellow_tall.png";
import InfoBoxPurple from "../../assets/images/profile/info_box_purple_tall.png";
import TagGreen from "../../assets/images/profile/tag_green.png";
import TagYellow from "../../assets/images/profile/tag_yellow.png";
import TagPurple from "../../assets/images/profile/tag_purple.png";
import Check from "../../assets/images/profile/check.svg";
import CloseRed from "../../assets/images/profile/close_red.svg";
import Security from "../../assets/images/profile/security.svg";
import IcScanHubWhite from "../../assets/images/profile/scanhub_white.svg";
import Button from "../global/Button";

const FREE_TYPE = "FREE_TYPE";
const PREMIUM_TYPE = "PREMIUM_TYPE";
const VIP_TYPE = "VIP_TYPE";

const data = [
  {
    type: VIP_TYPE,
    title: "$99.00/month",
    info: [
      { available: true, content: "Projects information" },
      { available: true, content: "Partnership information" },
      { available: true, content: "SscanJob information" },
      { available: true, content: "Scan infomation" },
      { available: true, content: "Search Results: ", subcontent: "10 Results", subContentColor: "green" },
      { available: true, content: "Watchlists" },
      { available: true, content: "Verify" },
      { available: false, content: "Ads" },
      { available: false, content: "Contact Data" },
      { available: false, content: "Message" },
      { available: true, content: "Support: ", subcontent: "Standard", subContentColor: "green" },
    ]
  },
  {
    type: FREE_TYPE,
    title: "48h30m",
    info: [
      { available: true, content: "Projects information" },
      { available: true, content: "Partnership information" },
      { available: true, content: "SscanJob information" },
      { available: true, content: "Scan infomation" },
      { available: true, content: "Search Results: ", subcontent: "Unlimited", subContentColor: "yellow" },
      { available: true, content: "Watchlists" },
      { available: true, content: "Verify" },
      { available: true, content: "Ads" },
      { available: true, content: "Contact Data:", subcontent: " 10 contacts/month", subContentColor: "yellow" },
      { available: true, content: "Message:", subcontent: "10 message/month", subContentColor: "yellow"}, 
      { available: true, content: "Support: ", subcontent: "Standard", subContentColor: "yellow"  },
    ]
  },
  {
    type: PREMIUM_TYPE,
    title: "Expired",
    info: [
      { available: true, content: "Projects information" },
      { available: true, content: "Partnership information" },
      { available: true, content: "SscanJob information" },
      { available: true, content: "Scan infomation" },
      { available: true, content: "Search Results: ", subcontent: "Unlimited", subContentColor: "yellow" },
      { available: true, content: "Watchlists" },
      { available: true, content: "Verify" },
      { available: true, content: "Ads" },
      { available: true, content: "Contact Data:", subcontent: "As many as you need", subContentColor: "purple" },
      { available: true, content: "Message:", subcontent: "As many as you need", subContentColor: "purple"}, 
      { available: true, content: "Support: ", subcontent: "Enhanced", subContentColor: "purple"},
    ]
  }
];

const MyNfts = () => {
  return (
    <div className="flex flex-col w-full mb-28  sm:px-0 px-8">
      {/* <p className="text-white text-lg sm:text-2xl font-montserrat_semi_bold font-semibold">
        My NFTs
      </p> */}
      <div className="flex flex-col sm:flex-row w-full items-center justify-between mt-8 space-y-8 sm:space-y-0 sm:mt-12 sm:space-x-12">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col space-y-12 sm:space-y-0 sm:flex-row sm:space-x-12 sm:w-fit max-w-[25%]"
          >
            <div className="relative flex flex-col items-center justify-center">
              <img
                src={
                  item.type === FREE_TYPE
                    ? InfoBoxGreen
                    : item.type === PREMIUM_TYPE
                      ? InfoBoxYellow
                      : InfoBoxPurple
                }
                alt=""
                className="h-[273px] sm:h-fit"
              />
              <div className="absolute -top-6 right-4 flex flex-row items-center justify-center">
                <img
                  src={
                    item.type === FREE_TYPE
                      ? TagGreen
                      : item.type === PREMIUM_TYPE
                        ? TagYellow
                        : TagPurple
                  }
                  alt=""
                />
                <p className="text-white font-montserrat text-base font-bold absolute">
                  {item.type === FREE_TYPE
                    ? "FREE"
                    : item.type === PREMIUM_TYPE
                      ? "PREMIUM"
                      : "VIP"}
                </p>
              </div>
              <div className="absolute flex flex-col items-center space-y-4 w-full px-6">
                <div className="space-y-3 flex flex-col items-center justify-center w-full">
                  {item.type === FREE_TYPE && (
                    <p className="text-white font-montserrat text-base">Left</p>
                  )}
                  <p className="text-white font-montserrat text-3xl mt-[31px]">
                    {item.title}
                  </p>
                </div>
                <div className="space-y-2 w-full flex flex-col justify-center">
                  {item.info.map((e, i) => (
                    <span key={i} className="flex flex-row w-full items-center justify-start">
                      <img src={e.available ? Check : CloseRed} alt="" />
                      <div className=" flex font-montserrat text-[14px] truncate">
                        {e.content}
                        {
                          (e.subcontent && e.subContentColor === "green") &&
                          <p className="text-[#00AF71] ml-1">{e.subcontent}</p>
                        }
                        {
                          (e.subcontent && e.subContentColor === "yellow") &&
                          <p className="text-[#FFC132] ml-1">{e.subcontent}</p>
                        }
                        {
                          (e.subcontent && e.subContentColor === "purple") &&
                          <p className="text-[#BA62FB] ml-1">{e.subcontent}</p>
                        }

                      </div>
                    </span>
                  ))}
                </div>
                {item.type === FREE_TYPE ? (
                  <div className="w-full flex flex-row items-center space-x-2">
                    <img src={Security} alt="" />
                    <p className="text-white font-montserrat text-xs">
                      Available now
                    </p>
                  </div>
                ) : item.type === PREMIUM_TYPE ? (
                  <div className="w-full flex flex-row justify-start items-center">
                    <Button
                      title={"Extend"}
                      className="px-4 py-2 rounded-[20px] bg-[#6C71DA]/[.1] text-sm"
                    />
                  </div>
                ) : (
                  <div className="w-full flex flex-row justify-start items-center">
                    <Button
                      title={"Buy Now"}
                      className="px-4 py-2 rounded-[20px] bg-[#6C71DA]/[.1] text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col relative justify-center sm:w-fit min-w-[25%]">
          <img src={BoxWallet} alt="" className="w-full" />
          <div className="absolute space-y-6 w-full p-8">
            <div>
              <img src={IcScanHubWhite} alt="" />
            </div>
            <div className="space-y-2">
              <p className="text-white text-2xl font-montserrat font-bold">
                [20,100.8] SCH
              </p>
              <p className="text-white text-sm font-montserrat font-normal">
                Wallet Balance
              </p>
            </div>
            <div className="flex flex-row items-center p-4 rounded-[32px] bg-[#08132F]/[.6] w-full justify-around">
              <Button
                title={"Deposit"}
                className="px-4 py-2 w-[128px] rounded-[20px] !bg-[#E26B45] text-sm"
              />
              <Button
                title={"Buy Now"}
                className="px-4 py-2 w-[128px] rounded-[20px] text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNfts;
