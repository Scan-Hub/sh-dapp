import React, { useState, useEffect } from "react";
import banner from "../assets/images/profile/banner_profile.png";
import DefaultAvatar from "../assets/images/profile/default_logo_scanhub.png";
import Information from "../components/profile/Information";
import MyProject from "../components/profile/MyProject";
import ModalEdit from "../components/profile/ModalEdit";

import Button from "../components/global/Button";
import TableWatchList from "../components/profile/TableWatchList";

import p1 from "../assets/images/report/p1.svg";
import p2 from "../assets/images/report/p2.svg";
import p3 from "../assets/images/report/p3.svg";
import p4 from "../assets/images/report/p4.svg";
import p5 from "../assets/images/report/p5.svg";
import IcBSC from "../assets/images/report/ic_bsc.svg";
import IcArrowTop from "../assets/images/report/ic_arrow_top.svg";

import IcGmail from "../assets/images/wallets/gmail.svg";
import IcMetamask from "../assets/images/wallets/meta_mask.svg";
import IcTron from "../assets/images/wallets/tron.svg";

import {
  closeEditModal,
  openEditModal,
  selectSetOpenModalEditInfo,
} from "../reducers/user/profile.reducer.js";
import { getKYC, getProfile } from "../actions/user.actions.js";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addressWalletCompact } from "../_helpers/lib";
import useLocalStorage from "../components/global/useLocalStorage";
import { statusKYC, titlesBtnKYC } from "../constants";
import DropdownMenu from "../components/profile/DropdownMenu";
import MyChannel from "../components/profile/MyChannel";
import { selectDataKYC } from "../reducers/user/project.reducer";

const tableBody = [
  {
    projectName: { img: p1, name: "Dogecoin", key: "DOGE" },
    chain: { symbolIcon: IcBSC, symbolName: "BSC" },
    marketCap: "$15,486",
    price: "$15,486",
    change: { changeStatus: IcArrowTop, changeValue: "4.21%" },
    holder: "589,817",
    comment: "600",
    report: "1283",
    chanceScam: "0.1",
  },
  {
    projectName: { img: p2, name: "Shiba Inu", key: "SHIB" },
    chain: { symbolIcon: IcBSC, symbolName: "BSC" },
    marketCap: "$15,486",
    price: "$15,486",
    change: { changeStatus: IcArrowTop, changeValue: "4.21%" },
    holder: "589,817",
    comment: "600",
    report: "1283",
    chanceScam: "0.58",
  },
  {
    projectName: { img: p3, name: "DinoSwap", key: "DOGE" },
    chain: { symbolIcon: IcBSC, symbolName: "BSC" },
    marketCap: "$15,486",
    price: "$15,486",
    change: { changeStatus: IcArrowTop, changeValue: "4.21%" },
    holder: "589,817",
    comment: "600",
    report: "1283",
    chanceScam: "0.78",
  },
  {
    projectName: { img: p4, name: "Nasa Doge", key: "NASADOGE" },
    chain: { symbolIcon: IcBSC, symbolName: "BSC" },
    marketCap: "$15,486",
    price: "$15,486",
    change: { changeStatus: IcArrowTop, changeValue: "4.21%" },
    holder: "589,817",
    comment: "600",
    report: "1283",
    chanceScam: "0.58",
  },
  {
    projectName: { img: p5, name: "MetaSpets", key: "NASADOGE" },
    chain: { symbolIcon: IcBSC, symbolName: "BSC" },
    marketCap: "$15,486",
    price: "$15,486",
    change: { changeStatus: IcArrowTop, changeValue: "4.21%" },
    holder: "589,817",
    comment: "600",
    report: "1283",
    chanceScam: "0.1",
  },
];

const IcWallet = {
  gmail: IcGmail,
  metamask: IcMetamask,
  tronLink: IcTron,
};

const listMenu = [
  { item: "Information", keyHash: "#information" },
  { item: "About Us", keyHash: "#about-us" },
  { item: "Watchlist", keyHash: "#watchlist" },
  { item: "My Project", keyHash: "#my-project" },
  { item: "My Channel", keyHash: "#my-channel" },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const dataKYC = useSelector(selectDataKYC);
  const dataProfile = useSelector((state) => state.profile.data, shallowEqual);
  const isOpenEditModal = useSelector(selectSetOpenModalEditInfo);

  const [value, setValue] = useLocalStorage("_wallet", "initial");

  useEffect(() => {
    setValue(localStorage.getItem("_wallet"));
  }, [dataProfile, setValue]);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getKYC());
  }, [dispatch]);

  const verify = (e) => {
    navigate("/verify");
  };

  const [keyHash, setKeyHash] = useState("#information");
  useEffect(() => {
    if (
      [
        "#information",
        "#about-us",
        "#watchlist",
        "#my-project",
        "#my-channel",
      ].includes(location.hash)
    ) {
      setKeyHash(location.hash);
    } else {
      setKeyHash("#information");
    }
  }, [location]);
  const onclickMenu = (param) => {
    navigate(param);
  };

  const onHiddenModalEdit = () => {
    dispatch(closeEditModal());
  };

  const renderTitle = (status) => {
    switch (status) {
      case statusKYC.APPROVED:
        return titlesBtnKYC.APPROVED;
      case statusKYC.SUBMITTED:
        return titlesBtnKYC.SUBMITTED;
      case statusKYC.IN_REVIEW:
        return titlesBtnKYC.IN_REVIEW;
      case statusKYC.NOT_START:
        return titlesBtnKYC.NOT_START;
      case statusKYC.REJECTED:
        return titlesBtnKYC.REJECTED;
      default:
        return titlesBtnKYC.NOT_START;
    }
  };

  const renderBackground = (status) => {
    const green = "#00AF71";
    const yellow = "#FFC132";
    const orange = "#E26B45";
    switch (status) {
      case statusKYC.APPROVED:
        return green;
      case statusKYC.SUBMITTED:
        return yellow;
      case statusKYC.IN_REVIEW:
        return yellow;
      case statusKYC.NOT_START:
        return green;
      case statusKYC.REJECTED:
        return orange;
      default:
        return green;
    }
  };

  const renderButtonVerify = () => {
    const disabled = dataKYC?.status === statusKYC.APPROVED ? true : false;

    return (
      <Button
        onClickBtn={verify}
        title={renderTitle(dataKYC?.status)}
        disabled={disabled}
        className={`w-full sm:px-14 sm:py-3 px-5 py-[6px] !bg-[${renderBackground(
          dataKYC?.status
        )}] rounded-[32px]`}
      />
    );
  };

  return (
    <section className="w-full h-full min-h-screen flex flex-col items-center bg-upload-content-bg">
      <div className="w-full h-auto">
        <img src={banner} alt="bg_header" className="w-full h-auto" />
      </div>
      {dataProfile && (
        <div className="flex flex-col container">
          <div className="flex w-full h-full justify-center flex-row relative">
            <div className="relative flex items-start flex-row container px-8">
              <div className="sm:-mt-20 -mt-10 flex flex-col items-center">
                <img
                  src={
                    dataProfile?.avatar ? dataProfile?.avatar : DefaultAvatar
                  }
                  referrerPolicy="no-referrer"
                  alt="avatar_default"
                  className="profile__avatar object-cover rounded-3xl w-[120px] h-[120px] sm:w-[200px] sm:h-[200px]"
                />
                <div className="sm:mt-6 mt-3 w-full">
                  {renderButtonVerify()}
                </div>
              </div>
              <div className="h-fit flex flex-col sm:mx-8 mx-6 mt-8 justify-between">
                <div className="flex flex-row items-center justify-start space-x-2">
                  <p className="bg-transparent w-fit px-1 text-start text-lg sm:text-3xl text-white font-bold not-italic font-montserrat_semi_bold focus:outline-none">
                    {dataProfile && dataProfile.address
                      ? addressWalletCompact(dataProfile.address)
                      : dataProfile.display_name}
                  </p>
                  {dataKYC?.type && (
                    <div className="flex flex-row items-center space-x-2">
                      <div className="w-[1px] h-5 bg-border" />
                      <p className="text-border font-montserrat text-base font-normal">
                        {dataKYC?.type.slice(0, 1).toLocaleUpperCase() +
                          dataKYC?.type.slice(1)}
                      </p>
                    </div>
                  )}
                </div>
                {dataProfile && value === "gmail" ? (
                  <div className="flex flex-row mt-2 px-2 py-2 rounded-lg items-center w-fit bg-[#191B2A]">
                    <img
                      src={IcWallet[value]}
                      alt="ethereum"
                      className="w-5 h-5 sm:w-8 lg:h-8"
                    />
                    <p className="ml-2 text-sm sm:text-base">
                      {dataProfile && dataProfile.email
                        ? dataProfile.email
                        : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {dataProfile && value !== "gmail" ? (
                  <div className="flex flex-row mt-2 px-2 py-2 rounded-lg items-center w-fit bg-[#191B2A]">
                    <img
                      src={IcWallet[value]}
                      alt="ethereum"
                      className="w-5 h-5 sm:w-8 lg:h-8"
                    />
                    <p className="ml-2 text-sm sm:text-base">
                      {dataProfile && dataProfile.address
                        ? addressWalletCompact(dataProfile.address)
                        : ""}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="absolute right-0 mt-[28px] flex justify-center items-center cursor-pointer" onClick={onShowModalEdit}>
              <img
                src={Edit_profile}
                alt="edit"
                className="w-6 h-6 lg:h-8 mr-4"
              />
              <p className=" font-montserrat_bold text-[18px]">Edit Profile</p>
            </div> */}
            </div>
          </div>
          <div className="mt-[64px] px-8 md:flex hidden">
            {listMenu.map((e, i) => {
              if (
                e.keyHash === "#about-us" &&
                dataKYC?.status === statusKYC.APPROVED
              ) {
                return <></>;
              } else {
                return (
                  <button type="button" className="project-filter-btn " key={i}>
                    <a
                      href={e.keyHash}
                      onClick={() => onclickMenu(e.keyHash)}
                      className={
                        keyHash === e.keyHash
                          ? "active !rounded-[32px]"
                          : "inactive !rounded-[32px]"
                      }
                    >
                      {e.item}
                    </a>
                  </button>
                );
              }
            })}
          </div>
          <div className="md:hidden flex justify-center mt-[40px] mb-[24px]">
            <DropdownMenu />
          </div>
          <div className="mt-[40px]">
            {keyHash === "#information" && (
              <div className="mt-[20px]">
                <Information
                  infoUser={dataProfile}
                  openModalEvent={() => dispatch(openEditModal())}
                />
              </div>
            )}
            {keyHash === "#about-us" && (
              <div className="flex items-center justify-center my-20">
                Not found data
              </div>
            )}
            {keyHash === "#watchlist" && (
              <div>
                <TableWatchList tableBody={tableBody} />
              </div>
            )}
            {keyHash === "#my-project" && (
              <div className="flex items-center justify-center">
                <MyProject />
              </div>
            )}
            {keyHash === "#my-channel" && (
              <div className="flex items-center justify-center">
                <MyChannel />
              </div>
            )}
          </div>
        </div>
      )}
      <ModalEdit
        isOpen={isOpenEditModal}
        onCloseModal={onHiddenModalEdit}
        data={dataProfile}
      />
    </section>
  );
};

export default ProfilePage;
