import { reports, global } from "../../assets";
import ProjectProgress from "./ProjectProgress";
import TradingViewWidget, {
  Themes,
  IntervalTypes,
} from "react-tradingview-widget";
import MetadataFeedCMC from "../partials/MetadataFeedCMC";
import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { selectMetaDataFeedCMC } from "../../reducers/project.reducer";
import iconQuestion from "../../assets/images/block-list/ic_question.svg";
import iconBinance from "../../assets/images/block-list/icon-binance.png";
import { selectListFormTypes } from "../../reducers/metadata.reducer";
import { fetchFormTypes, fetchProjectInfoOnCMC } from "../../actions";
const Sumary = ({ data }) => {
  const listFormTypes = useSelector(selectListFormTypes);
  const metaDataFeedCMC = useSelector(selectMetaDataFeedCMC);

  const chainOptions = useMemo(() => {
    return listFormTypes.items.filter((r) => r.type === "chain");
  }, [listFormTypes]);
  const [showComunity, setShowComunity] = useState(false);
  const comunityRef = useRef();
  const dispatch = useDispatch();
  const projectStatusList = [
    "Submit",
    "Procesing",
    "Verifies",
    "Check Team",
    "Done",
    "NFT Certificate",
  ];
  const onCopy = (data) => {
    if (data) {
      navigator.clipboard.writeText(data);
      dispatch(
        actions.alertActions.success({
          title: "Copied",
        })
      );
    }
  };

  const getChain = () => {
    const chain = chainOptions.find(
      (c) => c._id === data?.smart_contracts[0]?.chain
    );
    let imgSrc = iconQuestion;
    if (chain?.name === "Ethereum") {
      imgSrc = reports.IcETH;
    }
    if (chain?.name === "BNB") {
      imgSrc = iconBinance;
    }
    return chain ? (
      <div className="flex flex-row items-center p-[4px_10px] bg-[#ffffff1a] space-x-[10px] rounded">
        <img
          alt={`${chain?.name} Symbol`}
          src={chain?.logo}
          className="w-4 h-4 rounded-full"
        />
        <span className="font-montserrat_bold text-base text-white">
          {chain?.name}
        </span>
      </div>
    ) : null;
  };

  const getIconComunity = (type) => {
    let icSrc = "";
    switch (type) {
      case "twitter":
        icSrc = global.IcTwitter;
        break;
      case "telegram":
        icSrc = global.IcTelegram;
        break;
      case "discord":
        icSrc = global.IcDiscord;
        break;
      case "medium":
        icSrc = global.IcMedium;
        break;
      default:
        break;
    }
    return icSrc;
  };

  useEffect(() => {
    dispatch(fetchFormTypes());
  }, []);

  useEffect(() => {
    function handler(event) {
      // change starts here
      if (!comunityRef.current?.contains(event.target)) {
        setShowComunity(false);
      }
      // change starts here
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (
      data?.smart_contracts.length > 0 &&
      data?.smart_contracts[0]?.contract
    ) {
      dispatch(
        fetchProjectInfoOnCMC({ address: data.smart_contracts[0].contract })
      );
    } else if (data?.slug_project_name) {
      dispatch(fetchProjectInfoOnCMC({ slug: data.slug_project_name }));
    }
  }, [data]);

  return (
    <div className="flex flex-col p-4 lg:p-12 bg-[#191B2A] rounded-lg lg:rounded-[32px]">
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row space-y-4 sm:space-y-0 lg:space-y-4 xl:space-y-0 justify-between md:justify-between">
        <div className="flex flex-row items-center space-x-4">
          {data?.project_logo && (
            <img
              alt="Logo Scanhub"
              src={data.project_logo}
              className="cursor-pointer max-h-[35px]"
            />
          )}
          {data?.token_name && (
            <div className="w-[1px] min-w-[1px] h-1/2 bg-[#F2F2F2]">&nbsp;</div>
          )}
          {data?.token_name && (
            <div className="flex items-center p-[4px_10px] bg-[#ffffff1a] space-x-[10px] rounded">
              <span className="font-montserrat_bold text-base text-white">
                ${data?.token_name}
              </span>
            </div>
          )}
          {metaDataFeedCMC?.items && getChain()}
        </div>
        <div className="flex flex-row space-x-4 items-center">
          <div className="flex items-center h-10 p-[8px_12px] space-x-[10px] border border-[#2D3049] rounded">
            <span className="font-montserrat_medium text-base text-[#ADB2DB] whitespace-nowrap">
              {`On ${data?.watch_list_number} watchlists`}
            </span>
          </div>
          <div className="flex items-center h-10 p-[8px_12px] space-x-[10px] border border-[#2D3049] rounded">
            <img alt="" src={reports.IcHeart} />
          </div>
          <div className="flex items-center h-10 p-[8px_12px] space-x-[10px] border border-[#2D3049] rounded">
            <img alt="" src={reports.IcMore} />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <span className="font-montserrat_semi_bold text-base text-[#ffffff80]">
          PROJECT INFO
        </span>
        <div className="flex flex-wrap">
          <a
            className="flex flex-row mt-4 mr-[10px] md:mr-8 items-center space-x-[10px] p-[10px_12px] bg-[#ffffff0d] rounded-[32px] cursor-pointer"
            href={data?.company_website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="User" src={reports.IcWebsite} className="w-7 h-7" />
            <span className="font-montserrat_medium text-sm md:text-base text-white">
              Website
            </span>
          </a>
          <a
            className="btn-group flex flex-row mt-4 bg-[#ffffff0d] rounded-[32px] mr-[10px] md:mr-8"
            href={data?.white_paper}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex flex-row items-center space-x-[10px] p-[10px_12px] border-r border-[#ffffff0d]">
              <img alt="User" src={reports.IcWhitePaper} className="w-7 h-7" />
              <span className="font-montserrat_medium text-sm md:text-base text-white">
                Whitepaper
              </span>
            </button>
            <button className="flex flex-row items-center space-x-[10px] p-[10px_12px] rounded-[32px]">
              <img alt="User" src={reports.IcScanhub} className="w-4 h-4" />
            </button>
          </a>
          {data?.smart_contracts[0]?.contract && metaDataFeedCMC?.items ? (
            <div
              className="btn-group flex flex-row mt-4 bg-[#ffffff0d] rounded-[32px] mr-[10px] md:mr-8"
              onClick={() => onCopy(data.smart_contracts[0].contract)}
            >
              <button className="flex flex-row items-center space-x-[10px] p-[10px_12px] border-r border-[#ffffff0d]">
                <img
                  alt="User"
                  src={reports.IcETH}
                  className="w-[18px] h-[18px]"
                />
                <span className="font-montserrat_medium text-sm md:text-base text-white">
                  Contract
                </span>
                <img alt="User" src={reports.IcCopy} className="w-4 h-4" />
              </button>
              <button className="flex flex-row items-center space-x-[10px] p-[10px_12px] rounded-[32px]">
                <img
                  alt="User"
                  src={reports.IcArrowBotFill}
                  className="w-[11px] h-[6px]"
                />
              </button>
            </div>
          ) : null}
          <div
            ref={comunityRef}
            className="relative btn-group flex flex-row mt-4 bg-[#ffffff0d] rounded-[32px] mr-[10px] md:mr-8"
            onClick={() => setShowComunity(!showComunity)}
          >
            <button className="flex flex-row items-center space-x-[10px] p-[10px_12px] border-r border-[#ffffff0d]">
              <img
                alt="User"
                src={reports.IcCommunity}
                className="w-[18px] h-[18px]"
              />
              <span className="font-montserrat_medium text-sm md:text-base text-white">
                Community
              </span>
            </button>
            <button className="flex flex-row items-center space-x-[10px] p-[10px_12px] rounded-[32px]">
              <img
                alt="User"
                src={reports.IcArrowBotFill}
                className="w-[11px] h-[6px]"
              />
            </button>

            {showComunity && (
              <div className="absolute flex flex-col w-full top-15 bg-[#343440] divide-y-[1px] divide-[#000324] rounded-lg">
                {data?.communities &&
                  data?.communities.map((item, index) => (
                    <a
                      key={index}
                      className="flex flex-row space-x-[10px] items-center p-4 cursor-pointer"
                      href={item?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img alt={item?.type} src={getIconComunity(item?.type)} />
                      <span className="font-montserrat_medium text-sm md:text-base text-white">
                        {item?.type.charAt(0).toUpperCase() +
                          item?.type.slice(1)}
                      </span>
                    </a>
                  ))}
              </div>
            )}
          </div>
          <a
            className="btn-group flex flex-row mt-4 bg-[#ffffff0d] rounded-[32px] mr-[10px] md:mr-8"
            href={data?.source_code}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex flex-row items-center space-x-[10px] p-[10px_12px] border-r border-[#ffffff0d]">
              <img alt="User" src={reports.IcSourceCode} className="w-7 h-7" />
              <span className="font-montserrat_medium text-sm md:text-base text-white">
                Source Code
              </span>
            </button>
            <button className="flex flex-row items-center space-x-[10px] p-[10px_12px] rounded-[32px]">
              <img alt="User" src={reports.IcScanhub} className="w-4 h-4" />
            </button>
          </a>
        </div>
      </div>
      <div className="mt-8">
        {data?.latest_price_report && (
          <MetadataFeedCMC latest_price_report={data?.latest_price_report} />
        )}
      </div>
      {/* <div className="flex flex-col w-full md:w-3/4 mdx:w-3/4 lg:w-full 2xl:w-3/4  mt-8">
        <span className="font-montserrat_semi_bold text-sm md:text-base text-[#ffffff80]">
          PROJECT PROCESS
        </span>
        <div className="grid grid-rows-2 w-full gap-y-4 overflow-x-auto overflow-y-hidden pb-6 mt-4">
          <div className="flex flex-row justify-between space-x-8 items-center">
            {projectStatusList.map((item, index) => (
              <span
                key={index}
                className="font-montserrat_medium text-base text-white whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <ProjectProgress
              percent="33%"
              height="10px"
              radius="6px"
              background="#0D0F20"
              backgroundProcess="#00AF71"
            />
          </div>
        </div>
      </div> */}

      {data?.smart_contracts[0]?.contract && metaDataFeedCMC?.items && (
        <div className="mt-8">
          <label className="font-montserrat font-medium label-bg sm:text-[14px] text-[10px]">
            CHART
          </label>
          <div className="chartview w-full sm:h-[367px] h-[80vh] mt-6 border border-[#00AF71] rounded-xl p-4">
            {metaDataFeedCMC && metaDataFeedCMC?.items && (
              <TradingViewWidget
                // symbol={`${metaDataFeedCMC.items?.symbol}USD`}
                symbol={`${
                  metaDataFeedCMC.items?.symbol ===
                  data?.token_name.replace(/\s/g, "")
                    ? metaDataFeedCMC.items?.symbol
                    : "-"
                }USD`}
                theme={Themes.DARK}
                locale="fr"
                autosize
                interval={IntervalTypes.D}
                timezone="Etc/UTC"
                style="1"
                // locale="in"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sumary;
