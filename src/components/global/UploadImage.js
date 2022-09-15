import React, { useCallback, useEffect, useState } from "react";
import YupErrorMessage from "./YupErrorMessage";
import { dataURLtoFile } from "../../_helpers/lib";
import IcDeleteImage from "../../assets/images/profile/delete.svg";
import IcAddImage from "../../assets/images/profile/add_image.svg";

const UploadImage = ({
  type = "iapi",
  className,
  width,
  height,
  required = false,
  title,
  accept,
  uploadHint,
  recommendHint,
  name,
  error,
  setValue,
}) => {
  const [fileObj, setFileObj] = useState("");
  const [image, setImage] = useState("");
  const [showChooseImage, setShowChooseImage] = useState(false);

  useEffect(() => {
    onDropImage("drop-zone");
  }, []);

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
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}uploader/${type}/image`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        setFileObj(URL.createObjectURL(file));
        if (type === "secure") {
          setImage(json.data.path);
        } else {
          setImage(json.data.path);
        }
        return;
      });
  };

  const onDropImage = (id) => {
    const dropZone = document.getElementById(id);
    const reader = new FileReader();
    if (window.FileList && window.File) {
      dropZone.addEventListener("dragover", (event) => {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      });

      dropZone.addEventListener("drop", (event) => {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;
        const extension = files[0].type;

        reader.readAsDataURL(files[0]);
        reader.addEventListener("load", (event) => {
          const file = dataURLtoFile(event.target.result, extension);
          const formData = new FormData();
          formData.append("file", file);
          onUploadServer(formData, id);
        });
        return;
      });
    }
  };

  useEffect(() => {
    setValue(name, image);
  }, [image]);

  return (
    <div className={`${className}`}>
      {title && (
        <span className="font-montserrat_semi_bold mb-3 text-lg text-white">
          {title}
          {required && (
            <span className="font-montserrat_semi_bold text-sm text-[#F5222D] ml-[2px] align-top">
              *
            </span>
          )}
        </span>
      )}
      <div
        id="drop-zone"
        className="w-full h-fit bg-box-bg rounded-2xl flex flex-col  border-2 border-drop-border border-dashed relative"
        onMouseEnter={() => setShowChooseImage(true)}
        onMouseLeave={() => setShowChooseImage(false)}
        style={{ width: width, height: height }}
      >
        <div
          className={`z-[1] px-4 w-full h-full flex flex-col justify-center items-center absolute left-0 top-0 backdrop-blur-sm rounded-2xl ${
            showChooseImage || image === "" ? "flex" : "hidden"
          }`}
        >
          <label className="rounded-lg cursor-pointer w-full h-full flex flex-col justify-center items-center">
            <img src={IcAddImage} alt="upload" className="w-12 h-12" />
            <p className="text-base text-[#E8E8E8] font-montserrat_bold mt-4">
              {uploadHint}
            </p>
            <p className="text-sm text-grey-6 mt-1 font-montserrat font-normal text-center">
              {recommendHint}
            </p>
            <input
              type="file"
              className="hidden w-full h-full"
              accept={accept}
              onChange={(e) => onUploadHandler(e, "drop-zone")}
            />
          </label>
        </div>
        {image && fileObj && (
          <div className="relative overflow-hidden w-full h-full">
            <img
              className="w-full h-full object-cover rounded-2xl"
              alt="select_image"
              src={fileObj}
            />
            <img
              src={IcDeleteImage}
              alt={"delete"}
              className="w-6 h-6 absolute top-2 right-2 cursor-pointer z-10"
              onClick={() => setImage("")}
            />
          </div>
        )}
      </div>
      {error && <YupErrorMessage message={error.message} />}
    </div>
  );
};

export default UploadImage;
