import React, { useCallback, useState } from "react";

import IcDeleteImage from "../../assets/images/profile/delete.svg";
import IcCamera from "../../assets/images/FrmUserInformation/Cameraupload.svg";
import { useFormContext } from "react-hook-form"

const UploadImage = () => {
  const [image, setImage] = useState("");
  const [imageDes, setImageDes] = useState("");
  const [typeDes, setTypeDes] = useState("");
  const [showChooseImage, setShowChooseImage] = useState(false);
  const { register } = useFormContext()

  const onUploadImage = useCallback((event, id) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      if (id === "drop-zone-des") {
        setImageDes("");
        setTypeDes(img.type);
      }

      const formData = new FormData();
      formData.append("file", img);
      onUploadServer(formData, id);
      event.target.value = null;
    }
  }, []);

  const onUploadServer = (formData, id) => {
    fetch("https://url/storage/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        setImage(json.data.path);
        return;
      });
  };

  return (
    <div className="flex flex-row">
      <div
        id="drop-zone"
        className="sm:w-[250px] sm:h-[250px] min-w-[250px] min-h-[250px] bg-box-bg rounded-2xl flex flex-col  border-2 border-drop-border border-dashed relative"
        onMouseEnter={() => setShowChooseImage(true)}
        onMouseLeave={() => setShowChooseImage(false)}
      >
        <div
          className={`z-[1] w-full h-full flex flex-col justify-center items-center absolute left-0 top-0 backdrop-blur-sm rounded-2xl ${showChooseImage || image === "" ? "flex" : "hidden"
            }`}
        >
          <img src={IcCamera} alt="upload" className="w-12 h-12" />
          <p className="text-base text-[#9CA3AF] mt-[30px] font-poppins">
            (Recommend size 480x480)
          </p>

          <label className="text-base font-poppins text-white mt-6 border-[1px] border-white rounded-lg px-3 py-[12px] cursor-pointer">
            Choose image to upload
            <input
              type="file"
              name="myImage"
              className="hidden"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={(e) => onUploadImage(e, "drop-zone")}
              {...register("avatar")}
            />
          </label>
        </div>
        {image && (
          <div className="relative overflow-hidden w-full h-full">
            <img
              className="w-full h-full object-cover rounded-2xl"
              alt="select_image"
              src={image}
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
    </div>
  );
};

export default UploadImage;
