import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reports } from "../../assets";
import ModalReport from "./ModalReport";
import { fetchProjectInfoOnCMC } from "../../actions";
import { selectMetaDataFeedCMC } from "../../reducers/project.reducer";
import {
  addressWalletCompact,
  copyTextToClipboard,
} from "../../_helpers/utils/lib";
import * as actions from "../../actions";
const Information = ({ data }) => {
  const dispatch = useDispatch();

  const metaDataFeedCMC = useSelector(selectMetaDataFeedCMC);

  const onCopyAddress = (text) => {
    copyTextToClipboard(text);
    dispatch(
      actions.alertActions.success({
        title: "Copied",
      })
    );
  };
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
    <div className="w-full flex flex-col p-12 bg-[#191B2A] rounded-lg lg:rounded-[32px]">
      <div className="flex flex-row items-center space-x-4">
        {data?.project_logo && (
          <img alt="" src={data?.project_logo} className="w-9 h-9" />
        )}
        <div className="flex flex-col space-y-[2px]">
          <span className="font-montserrat_bold text-sm text-white">
            {data?.project_name || ""}
          </span>
          {data?.smart_contracts[0]?.contract
            ? metaDataFeedCMC?.items && (
                <div className="flex flex-row items-center">
                  <span className="text-sm text-[#BFBFBF]">
                    {addressWalletCompact(data?.smart_contracts[0]?.contract)}
                  </span>
                  <img
                    alt=""
                    src={reports.IcCopy}
                    className="ml-[14px] cursor-pointer"
                    onClick={() => {
                      onCopyAddress(data?.smart_contracts[0]?.contract);
                    }}
                  />
                </div>
              )
            : "-"}
        </div>
      </div>
      <span className="font-montserrat_medium text-sm text-[#F5F0ED] mt-8">
        Chance of Being Scam
      </span>
      <button className="mt-4 bg-gradient-to-r from-[#00AF71] to-[#7C7BF5] p-[0px_10px] rounded-2xl">
        Coming soon
      </button>
      <ModalReport />
    </div>
  );
};

export default Information;
