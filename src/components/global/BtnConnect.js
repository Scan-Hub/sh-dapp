
import { useSelector, shallowEqual } from "react-redux";
import { addressWalletCompact } from "../../_helpers/lib";

import IcWallet from "../../assets/images/wallets/ic_wallet.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const BtnConnect = ({ onShowModalConnect }) => {

  const profile = useSelector((state) => state.profile.data, shallowEqual);

  const [value , setValue] = useLocalStorage('_wallet', 'initial');

  const Navigate = useNavigate();
  
  async function handlClick(event) {
    Navigate("../connectwallet", { replace: true });
  }

  useEffect(() => {
    setValue(localStorage.getItem('_wallet'));
  },[profile]);

  return (  
    <>
      {(profile && value !== "gmail") &&
        <button
          className="flex bg-[#00AF71] text-[14px] px-[14px] py-[7px] rounded-[50px] gap-x-2"
          onClick={onShowModalConnect}
        >
          <img src={IcWallet} alt="icon wallet" />
          {profile && profile.address ? addressWalletCompact(profile.address) :""}
        </button>
      }

      {(profile && value === "gmail") &&

        <button
          className="flex bg-[#00AF71] text-[14px] px-[14px] py-[7px] rounded-[50px] gap-x-2"
          onClick={onShowModalConnect}
        >
          <img src={IcWallet} alt="icon wallet" />
          {(profile?.display_name)}
        </button>
      }

      {(!profile) &&
        <button
          className="bg-[#00AF71] text-[14px] px-[14px] py-[7px] rounded-[50px] font-montserrat_semi_bold"
          onClick={handlClick}
        >
          SIGN IN
        </button>
      }

    </>
  );
};

export default BtnConnect;
