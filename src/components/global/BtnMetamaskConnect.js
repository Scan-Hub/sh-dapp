import { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import * as actions from "../../actions";

import IcMetamask from "../../assets/images/wallets/meta_mask.svg";
import { alertActions} from "../../actions";
import { randomKeyUUID } from "../../_helpers/utils/lib";
import { openEditModal } from "../../reducers/user/profile.reducer";
const BtnMetamaskConnect = ({onChangeWallet, getLocalWallet}) => {
  const key = randomKeyUUID();
  const [isConnecting, setIsConnecting] = useState(false);
  const dispatch = useDispatch();

  let keyWallet ="metamask";

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
        .then(() => {
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
          <img src={IcMetamask} alt={"icon_wallet"} />
          <p className="text-white font-montserrat_semi_bold font-semibold text-sm ml-6">
            {isConnecting ? "Connecting...": "Meta Mask"}
          </p>
        </div>
        {getLocalWallet(keyWallet)}
    </button>
  );
};

export default BtnMetamaskConnect;
