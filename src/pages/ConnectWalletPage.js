import React, { useEffect } from "react";
import ConectWalletGmail from "../components/global/ConnectWalletPage/ConnectWalletGmail.js";
import ConectWalletMeta from "../components/global/ConnectWalletPage/ConnectWalletMeta.js";
import ConectWalletTronLink from "../components/global/ConnectWalletPage/ConnectWalletTronLink.js";

import useLocalStorage from '../components/global/useLocalStorage';

import IcTrust from "../assets/images/wallets/trust.svg";
import IcKeplr from "../assets/images/wallets/keplr.svg";
import IcNear from "../assets/images/wallets/near.svg";
import IcElrond from "../assets/images/wallets/elrond.svg";
import IcTicked from "../assets/images/wallets/tick.svg";
import { shallowEqual, useSelector } from "react-redux";

const ConnectWalletPage = () => {

    const profile = useSelector((state) => state.profile.data, shallowEqual);

    const [value, setValue] = useLocalStorage('_wallet', 'initial');

    useEffect(() => {
        setValue(localStorage.getItem('_wallet'));
    }, [profile])

    const getLocalWallet = (nameWallet) => {
        if (nameWallet === value) {
            return <img src={IcTicked} alt="tick" />;
        }
    }
    const wallets = [
        { id: 2, icon: IcTrust, name: "TrustWallet" },
        { id: 3, icon: IcKeplr, name: "Keplr" },
        { id: 5, icon: IcNear, name: "NearWallet" },
        { id: 6, icon: IcElrond, name: "ElrondWeb" },
    ];

    return (
        <div className="bg-modal-apply bg-cover">
            <div className="lg:container pt-[100px] py-[256px] md:mx-auto px-4">
                <div className="md:w-[50%] mx-auto">
                    <div className="text-center font-montserrat_semi_bold text-[24px] text-[#00AF71] tracking-[16px]  pb-[48px]">
                        WELCOME!
                    </div>
                    <div className="grid grid-rows-7 gap-4">
                        <div className="">
                            <ConectWalletGmail _wallet={value} onChangeWallet={setValue} getLocalWallet={getLocalWallet} />
                        </div>
                        <ConectWalletMeta _wallet={value} onChangeWallet={setValue} getLocalWallet={getLocalWallet} />
                        <ConectWalletTronLink _wallet={value}  onChangeWallet={setValue} getLocalWallet={getLocalWallet} />
                        {wallets.map((wallet) => (
                            <button
                                key={wallet.id}
                                className="w-full flex flex-row items-center justify-center py-[18px] px-6 rounded-lg min-w-[180px] bg-white/5">
                                <div className="flex flex-row w-full items-center">
                                    <div className="w-fit flex items-center">
                                        <img src={wallet.icon} alt={"icon_wallet"} className="w-8 h-8" />
                                        <p className="text-[18px] font-montserrat_semi_bold ml-[24px]">{wallet.name}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectWalletPage;
