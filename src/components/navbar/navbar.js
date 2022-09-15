/* eslint-disable no-restricted-globals */
import React, { useState ,useEffect} from "react";
import { useNavigate, NavLink } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import iconMan from "../../assets/images/navbar/icon-man.png";
import iconNoti from "../../assets/images/navbar/noti.svg";
import iconHamburger from "../../assets/images/navbar/icon-hamburger.svg";
import iconUsa from "../../assets/images/navbar/icon-usa.png";
import "./navbar.scss";
import ModalConnectWallet from "../global/ModalConnectWallet";
import BtnConnect from "../global/BtnConnect";
import useLocalStorage from "../global/useLocalStorage";
import { getProfile } from "../../actions/user.actions.js";
import { useDispatch, useSelector,shallowEqual } from "react-redux";

const routes = [
  {
    label: "Scan",
    path: "/report",
  },
  // {
  //   label: "Cryptocurrencies",
  //   path: "/cryptocurrencies",
  // },
  {
    label: "News",
    path: "/news",
  },
  {
    label: "Community",
    path: "/community",
  },
  {
    label: "Partnership",
    path: "/partnership",
  },
  {
    label: "Scan Job",
    path: "/scan-job",
  },
 
];

const NavBar = () => {

  const profile = useSelector((state) => state.profile.data, shallowEqual);
  const [value , setValue] = useLocalStorage('_wallet', 'initial');
  useEffect(() => {
    setValue(localStorage.getItem('_wallet'));
  },[profile]);
  useEffect(() => {
      dispatch(getProfile())
  }, [])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModalConnect, setShowModalConnect] = useState(false);

  const handleMenu = (path) => {
    navigate("../connectwallet", { replace: true });
  };
  const handleMenuApply = (path) => {
    navigate("../apply-project", { replace: true });
  };
  const onClickHamIcon = () => {
    document.getElementById("myNav").style.width = "0";
  };
  const onShowModalConnect = () => {
    setShowModalConnect(!showModalConnect);
  };

  const onHiddenModalConnect = () => {
    setShowModalConnect(false);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center bg-[#0D152280] lg:bg-newForm">
        <div className="w-full mx-4 lg:mx-0 lg:w-auto flex items-center">
          <div className="mx-[16px] my-[15px] min-w-[140px]">
            <img
              src={logo}
              className="w-[140px] cursor-pointer"
              onClick={() => {
                location.href = "/";
              }}
              alt=""
            />
          </div>

          <div className="hidden lg:flex items-center justify-between ml-5">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className="px-6 text-[14px] font-montserrat_semi_bold"
              >
                {route.label}
              </NavLink>
            ))}
          </div>
          <div className="block ml-auto lg:hidden">
            <img
              src={iconHamburger}
              alt="icon_hamburger"
              onClick={() =>
                (document.getElementById("myNav").style.width = "100%")
              }
            />
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center gap-4 mr-4">
          <button
            className=" bg-[#E26B45] text-[14px] px-[14px] py-[7px] rounded-[50px] font-montserrat_semi_bold font-semibold"
            onClick={profile && value ? handleMenuApply : handleMenu}
          >
            APPLY PROJECT
          </button>

          <BtnConnect onShowModalConnect={onShowModalConnect} />
          <div className={profile && value ? "block" : "hidden"}>
            <NavLink to="/profile">
              <img src={iconMan} alt="" />
            </NavLink>
          </div>
          
          <div className="relative px-1">
            <img src={iconNoti} alt="" />
            <p className="absolute  top-0 right-0 text-[#ffffff] bg-[#F5222D] text-[12px] px-[4px] py-[2px] rounded-[32px] leading-3">6+</p>
          </div>
        
          <img src={iconUsa} alt="" />
          
        </div>
      </div>

      <div
        id="myNav"
        className="h-full w-0 fixed z-[1] top-0 left-0 bg-[#0D0F20] overflow-x-hidden transition-[0.5s]"
      >
        <p
          className="absolute right-[10px] text-[60px]"
          onClick={onClickHamIcon}
        >
          &times;
        </p>
        <div className="relative flex-col w-full text-center mt-[30px] top-1/4">
          {routes.map((route, i) => (
            <div className="my-10 font-montserrat text-[24px]" key={i}>
              <NavLink
                key={route.path}
                to={route.path}
                onClick={onClickHamIcon}
              >
                {route.label}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <ModalConnectWallet
        isOpen={showModalConnect}
        onClose={onHiddenModalConnect}
      />
      {/* <ModalVerify
        showModalVerify={showModalVerify}
        onCloseModal={onCloseModal}
      /> */}
    </div>
  );
};
export default NavBar;
