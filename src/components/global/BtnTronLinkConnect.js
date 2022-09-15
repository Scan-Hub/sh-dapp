import { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import * as actions from "../../actions";

import IcWallet from "../../assets/images/wallets/tron.svg";


const BtnTronLinkConnect = ({ onChangeWallet, getLocalWallet}) => {

  const [isConnecting, setIsConnecting] = useState(false);
  const dispatch = useDispatch();

  let keyWallet ="tronLink";

  const connectWalletHandler = async () => {
    if (!isConnecting) {
      setIsConnecting(true);
      await dispatch(actions.web3ConnectTron(true))
        .then((res) => {
          setIsConnecting(false);
          console.log("res",res);
          if(res){
            onChangeWallet(keyWallet);
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
      className="w-full flex flex-row items-center justify-between py-3 px-4 rounded-lg bg-white/5"
      >
         <div className="flex flex-row items-center">
            <img src={IcWallet} alt={"icon_wallet"} />
            <p className="text-white font-montserrat_semi_bold font-semibold text-sm ml-6">
              {isConnecting ? "Connecting...": "TronLink"}
            </p>
         </div>
         {getLocalWallet("tronLink")}
    </button>
  );
};

export default BtnTronLinkConnect;
