import React from "react";
import Modal from "react-modal";
import {
  openModalSubmitForm,
  selectIsOpenModalSubmitForm,
} from "../../../reducers/form.reducer";
import { useDispatch, useSelector } from "react-redux";
import { partials } from "../../../assets";
import { useLocation } from "react-router-dom";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(97.6deg, #181F2D 0.41%, #181427 101.99%)",
    width: "460px",
  },
};
const ModalFormSubmit = ({ showModalVerify, onCloseModal }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModalSubmitForm);
  const closeModal = () => {
    if(location?.pathname === "/apply-project"){
      window.location.reload();
    }
    dispatch(openModalSubmitForm({ isOpen: false }));
  };

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal-sh p-8 flex flex-col rounded-2xl"
      overlayClassName="sh-modal-overlay"
    >
      <div className="flex flex-col items-center space-y-8 w-full p-8 bg-gradient-to-r from-[#181F2D] to-[#181427]">
        <p className="font-montserrat_bold text-xl text-white">Thank you</p>
        <span className="text-sm text-[#ADB2DB] ">
          Your application has been successfully submitted
        </span>
        <img src={partials.IcTick} alt="Submit form" />
        <button
          className="w-full p-[12px_24px] bg-[#00AF71] rounded-[32px] text-base text-white font-montserrat_semi_bold"
          onClick={closeModal}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default ModalFormSubmit;
