import { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as actions from "../../../actions";
import { useNavigate } from "react-router-dom";
import IcMetamask from "../../../assets/images/wallets/meta_mask.svg";
import { alertActions} from "../../../actions";
import { randomKeyUUID } from "../../../_helpers/utils/lib";
import { openEditModal } from "../../../reducers/user/profile.reducer";

const ConnectWalletMeta = ({ onChangeWallet, getLocalWallet }) => {
  const key = randomKeyUUID();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const dispatch = useDispatch();

  let keyWallet = "metamask";

  const connectWalletHandler = async () => {
    if (!isConnecting) {
      setIsConnecting(true);
      dispatch(
        alertActions.loading(
          {
            title: "Connecting",
            description: `Connect MetaMask waiting...`,
          },
          key
        )
      );
      await dispatch(actions.web3ConnectEther(true))
        .then( async (res) => {

          setIsConnecting(false);
          onChangeWallet(keyWallet);
          dispatch(
            alertActions.update(
              {
                status: "success",
                title: "Login Sucessfully",
                description: `Do you want to update more information?`,
                details:{
                  url:"../profile",
                  label:"Update Information",
                  color:"#699B8C",
                  action: () => dispatch(openEditModal())
                }
              },
                key
              )
          );
          setTimeout(() => {
            navigate("../profile", { replace: true });
          }, 1000);
        })
        .catch((e) => {
          setIsConnecting(false);
        });
    }
  };

  return (
    <button
      onClick={connectWalletHandler}
      className="w-full flex flex-row items-center justify-between py-[18px] px-6 rounded-lg bg-white/5">
      <div className="flex flex-row w-full items-center">
        <div className="w-fit flex items-center">
          <img src={IcMetamask} alt="gmail_logo" className="w-8 h-8" />
          <p className="text-[18px] font-montserrat_semi_bold ml-[24px]">
            {isConnecting ? "Connecting..." : "Meta Mask"}
          </p>
        </div>
      </div>
      {getLocalWallet(keyWallet)}
    </button>
  );
};

export default ConnectWalletMeta;
