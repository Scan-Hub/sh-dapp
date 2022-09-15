
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as actions from "../../actions";

import { addressWalletCompact } from "../../_helpers/lib";

import IcAvatar from "../../assets/images/wallets/ic_avatar.svg";
import IcLogout from "../../assets/images/wallets/ic_logout.png";

import { useLocation ,useNavigate } from "react-router-dom";

const MyWallet = ({onChangeWallet}) => {

  // const account = useSelector((state) => state.web3.account, shallowEqual);
  const profile = useSelector((state) => state.profile.data, shallowEqual);

  let location = useLocation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const disConnectWallet = async () => {

    await dispatch(actions.web3Disconnect());
    
    onChangeWallet("");

    if(location.pathname === "/profile"){
      Navigate("/connectwallet", { replace: true })
    }

  };
  
  return (
    <>
    {profile ?
    <div className="flex flex-row items-center justify-between ">
       <div className="flex flex-row items-center">
            <div className="icon flex flex-row justify-center items-center p-2">
              <img  src={IcAvatar} alt="icon_profile" />
            </div>
            <p className="text-left text-white text-sm font-poppins font-bold ml-2">
              { profile.address ? addressWalletCompact(profile.address): profile.email }
            </p>
        </div>
      <div
          className="btn_login flex flex-row items-center cursor-pointer"
          onClick={disConnectWallet}
        >
          <img src={IcLogout} alt="logout" />
        </div>
    </div>:""}
    </>
  );
};

export default MyWallet;
