import React from "react";
import Modal from "react-modal";
import "./styles.scss";

import IcProReg from "../../assets/images/profile/icon_pro_reg.svg";
import IcComReg from "../../assets/images/profile/icon_company_reg.svg";
import IcDevReg from "../../assets/images/profile/icon_dev_reg.svg";
import IcVcsReg from "../../assets/images/profile/icon_vcs_reg.svg";
import IcMktReg from "../../assets/images/profile/icon_mkt_reg.svg";
import IcLaunchPadReg from "../../assets/images/profile/icon_launchpad_reg.svg";
import IcIncubatorReg from "../../assets/images/profile/icon_incubator_reg.svg";
import IcArrowNext from "../../assets/images/profile/arrow-next.svg";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // background: "linear-gradient(97.6deg, #181F2D 0.41%, #181427 101.99%)",
    width: "fit-content",
  },
};

const registrations = [
  {
    id: 1,
    icon: IcProReg,
    name: "Project",
  },
  {
    id: 2,
    icon: IcComReg,
    name: "Company",
  },
  {
    id: 3,
    icon: IcDevReg,
    name: "Developer",
  },
  {
    id: 4,
    icon: IcVcsReg,
    name: "Venture Capital",
  },
  {
    id: 5,
    icon: IcMktReg,
    name: "Marketing Agency",
  },
  {
    id: 6,
    icon: IcLaunchPadReg,
    name: "Launchpad",
  },
  {
    id: 7,
    icon: IcIncubatorReg,
    name: "Incubator",
  },
  {
    id: 8,
    icon: IcIncubatorReg,
    name: "Accelerator",
  },
];

const ModalVerify = ({ showModalVerify, onCloseModal }) => {
  const navigate = useNavigate();
  const onSelect = (item) => {
    onCloseModal();
    if (item.id === 1) {
      navigate("/apply-project");
    }
    if (item.id === 2) {
      navigate("/apply-company");
    }
    if (item.id === 4) {
      navigate("/venture-capital");
    }
    if (item.id === 5) {
      navigate("/marketing-agency");
    }
    if (item.id === 6) {
      navigate("/launchpad");
    }
    if (item.id === 7) {
      navigate("/incubator");
    }
    if (item.id === 8) {
      navigate("/accelerator");
    }
    // if (item.id === 4) {
    //   navigate("/venture-capital");
    // }
  };

  return (
    <Modal
      isOpen={showModalVerify}
      ariaHideApp={false}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal-sh p-8 flex flex-col rounded-3xl w-full items-center justify-center"
      overlayClassName="apply-modal-overlay"
    >
      <div className="w-[45vw]">
        <p className="text-green-text-profile text-2xl font-poppins_bold text-center">
          What kind of category and information
        </p>
        <div className="grid grid-cols-2 grid-flow-col grid-rows-4 gap-x-8 gap-y-4 w-full mt-12">
          {registrations.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="w-full py-4 px-4 rounded-lg flex flex-row items-center justify-between bg-white/5"
            >
              <div className="flex flex-row items-center space-x-8">
                <img src={item.icon} alt="w-9" />
                <p className="text-white text-lg font-montserrat_medium font-medium">
                  {item.name}
                </p>
              </div>
              <img src={IcArrowNext} alt="w-6" />
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalVerify;
