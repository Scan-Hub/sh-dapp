import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import "./style.scss";
import user_img from "../../assets/images/profile/profileimg_defaul.png";
import editimg_icon from "../../assets/images/profile/editimg_icon.png";
import arrow_down_thin from "../../assets/images/profile/arrow_down_thin.svg";
import Lock from "../../assets/images/profile/Lock.svg";
import Unlock from "../../assets/images/profile/Unlock.svg";
import ReactPhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(97.6deg, #181F2D 0.41%, #181427 101.99%);",
    width: "fit-content",
    height: "90vh",
  },
};

const ModalEdit = ({ isOpen, onCloseModal, data }) => {
  const dispatch = useDispatch();

  const [fileObj, setFileObj] = useState("");
  const [image, setImage] = useState(data?.avatar);
  const [showChooseImage, setShowChooseImage] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [enableBirthdayField, setBirthdayEnableField] = useState(true);
  const [enableEmailField, setEmailEnableField] = useState(true);
  const [enablePhoneField, setPhoneEnableField] = useState(true);
  const [enableGenderField, setGenderEnableField] = useState(true);
  const [date, setDate] = useState("");
  const handleChange = (date) => {
    setDate(date);
  };
  const onSubmit = (data, e) => {
    data.birthday = new Date(data?.birthday).getTime() / 1000;
    data.avatar = image;
    dispatch(updateProfile(data));
  };

  const onUploadHandler = useCallback((event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      onUploadServer(formData, file);
      event.target.value = null;
    }
  }, []);

  const onUploadServer = async (formData, file) => {
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}uploader/iapi/image`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        setFileObj(URL.createObjectURL(file));
        setImage(json.data.path);
        return;
      });
  };
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal-sh flex flex-col rounded-3xl w-full items-center justify-center"
      overlayClassName="edit-modal-overlay"
    >
      <div className="w-full scroll-component flex flex-col items-center min-w-[500px] edit-form p-[32px] rounded-[16px]">
        <div className="relative block w-[80px] h-[80px] mb-[32px]">
          <img
            className="z-[-1] w-[80px] h-[80px] rounded-[32px]"
            src={image ?? user_img}
          />
          <label for="file-input">
            <img
              className="w-[24px] absolute bottom-0 right-0"
              src={editimg_icon}
            />
          </label>
          <input
            id="file-input"
            type="file"
            className="hidden w-full h-full"
            accept={"image/png, image/jpg, image/jpeg, image/gif"}
            onChange={(e) => onUploadHandler(e, "drop-zone")}
          />
        </div>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full pb-[24px]">
            <label className="font-montserrat_bold">Username</label>
            <div className="input-bg-field px-[16px] py-[12px] mt-[12px]">
              <input
                className="bg-transparent w-full focus:outline-0 font-montserrat_medium"
                defaultValue={data?.display_name}
                type="text"
                placeholder="@username"
                {...register("display_name")}
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block font-montserrat_bold mb-[12px]">
              Birthday
            </label>
            <div className="flex items-center">
              <Controller
                name={"birthday"}
                control={control}
                defaultValue={""}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DatePicker
                      onChange={onChange}
                      selected={value}
                      placeholderText="MM/DD/YYYY"
                    />
                  );
                }}
              />
              <div>
                <img
                  className="ml-4 w-[24px]"
                  onClick={() => setBirthdayEnableField(!enableBirthdayField)}
                  src={enableBirthdayField ? Unlock : Lock}
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-[24px]">
            <label className="font-montserrat_bold">Phone</label>
            <div className="flex items-center">
              <div className="flex px-[16px] py-[8px] mt-[12px] w-full input-bg-field">
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { ...field } }) => (
                    <ReactPhoneInput
                      {...field}
                      country={"vi"}
                      countryCodeEditable={true}
                      specialLabel={"Player Mobile Number"}
                    />
                  )}
                />
              </div>
              <div>
                <img
                  className="ml-4 w-[24px]"
                  onClick={() => setPhoneEnableField(!enablePhoneField)}
                  src={enablePhoneField ? Unlock : Lock}
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-[24px]">
            <label className="block font-montserrat_bold mb-[12px] ">
              Gender
            </label>
            <div className="flex items-center">
              <div className="flex input-bg-field px-[16px] py-[12px] w-full">
                <select
                  className="select-editprofile bg-transparent focus:outline-0 font-montserrat_medium w-full text-[#9CA3AF]"
                  defaultValue={data?.gender}
                  {...register("gender")}
                >
                  <option value="" disabled hidden>
                    Male
                  </option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="Other">Other</option>
                </select>
                <div className="flex items-center">
                  <img
                    alt="select_icon"
                    src={arrow_down_thin}
                    className={`w-[24px] h-[24px] transition-transform`}
                  />
                </div>
              </div>
              <div>
                <img
                  className="ml-4 w-[24px]"
                  onClick={() => setGenderEnableField(!enableGenderField)}
                  src={enableGenderField ? Unlock : Lock}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className=" rounded-[32px] bg-[#00AF71] py-[12px] mt-[32px] min-w-[200px]"
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEdit;
