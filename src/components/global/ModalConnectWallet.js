import React, { useEffect } from "react";
import Modal from "react-modal";
import LoginGmail from "./LoginGmail";
import "./styles.scss";

import IcMetamask from "../../assets/images/wallets/meta_mask.svg";
import IcTrust from "../../assets/images/wallets/trust.svg";
import IcKeplr from "../../assets/images/wallets/keplr.svg";
import IcTron from "../../assets/images/wallets/tron.svg";
import IcNear from "../../assets/images/wallets/near.svg";
import IcElrond from "../../assets/images/wallets/elrond.svg";
import IcTicked from "../../assets/images/wallets/tick.svg";

import BtnMetamaskConnect from "./BtnMetamaskConnect";
import BtnTronLinkConnect from "./BtnTronLinkConnect";
import MyWallet from "../account/MyWallet";
import useLocalStorage from './useLocalStorage';
import { shallowEqual, useSelector } from "react-redux";


const wallets = [
  // { id: 1, icon: IcMetamask, name: "Meta Mask" },
  { id: 2, icon: IcTrust, name: "TrustWallet" },
  { id: 3, icon: IcKeplr, name: "Keplr" },
  // { id: 4, icon: IcTron, name: "TronLink" },
  { id: 5, icon: IcNear, name: "NearWallet" },
  { id: 6, icon: IcElrond, name: "ElrondWeb" },
];

const ModalConnectWallet = ({ isOpen, onClose }) => {

  const profile = useSelector((state) => state.profile.data, shallowEqual);

  const [value, setValue] = useLocalStorage('_wallet', 'initial');

  useEffect(() => {
    setValue(localStorage.getItem('_wallet'));
}, [profile])

  const getLocalWallet =(nameWallet) => { 
    if(nameWallet === value){
       return <img src={IcTicked} alt="tick" /> ;
    }
  }
  return (
    <Modal
      onRequestClose={onClose}
      isOpen={isOpen}
      ariaHideApp={false}
      className="flex flex-col w-full"
      overlayClassName="modal-transparent-overlay"
    >
      <div className="absolute flex flex-col right-12 top-18 w-[320px] max-w-[350px] min-w-[228px] bg-modal-bg p-6 rounded-xl space-y-4">
       <MyWallet onChangeWallet={setValue} />
       <LoginGmail  _wallet={value} onChangeWallet={setValue} getLocalWallet={getLocalWallet} />
       <BtnMetamaskConnect _wallet={value} onChangeWallet={setValue} getLocalWallet={getLocalWallet}/>
       <BtnTronLinkConnect _wallet={value} onChangeWallet={setValue} getLocalWallet={getLocalWallet} />
        {wallets.map((wallet) => (
          <button
            key={wallet.id}
            className="w-full flex flex-row items-center py-3 px-4 rounded-lg min-w-[180px] bg-white/5"
          >
            <img src={wallet.icon} alt={"icon_wallet"} />
            <p className="text-white font-montserrat_semi_bold font-semibold text-sm ml-6">
              {wallet.name}
            </p>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default ModalConnectWallet;
