import { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as actions from "../../../actions";
import { useNavigate } from "react-router-dom";
import IcWallet from "../../../assets/images/wallets/tron.svg";
import { alertActions} from "../../../actions";
import { randomKeyUUID } from "../../../_helpers/utils/lib";
import { openEditModal } from "../../../reducers/user/profile.reducer";


const ConnectWalletTronLink = ({ onChangeWallet, getLocalWallet }) => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const dispatch = useDispatch();
  const key = randomKeyUUID();

  let keyWallet = "tronLink";

  const connectWalletHandler = async () => {
    if (!isConnecting) {
      dispatch(
        alertActions.loading(
          {
            title: "Connecting",
            description: `Connect TronLink waiting...`,
          },
          key
        )
      );
      setIsConnecting(true);
      await dispatch(actions.web3ConnectTron(true))
        .then((res) => {
          setIsConnecting(false);
          console.log("res", res);
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
          if (res) {
            onChangeWallet(keyWallet);
            navigate("../profile", { replace: true });
          }
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
          <img src={IcWallet} alt="gmail_logo" className="w-8 h-8" />
          <p className="text-[18px] font-montserrat_semi_bold ml-[24px]">
            {isConnecting ? "Connecting..." : "TronLink"}
          </p>
        </div>
      </div>
      {getLocalWallet("tronLink")}
    </button>
  );
};

export default ConnectWalletTronLink;
