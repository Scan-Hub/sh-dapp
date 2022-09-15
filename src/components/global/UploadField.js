import React, { useCallback, useEffect, useState } from "react";

import IcDeleteImage from "../../assets/images/profile/delete.svg";
import IcAddImage from "../../assets/images/profile/add_image.svg";
import { dataURLtoFile } from "../../_helpers/lib";

const UploadField = ({ onReturnFile }) => {
  const [image, setImage] = useState("");
  const [showChooseImage, setShowChooseImage] = useState(false);

  useEffect(() => {
    onDropImage("drop-zone");
  }, []);

  const onUploadImage = useCallback((event, id) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      const formData = new FormData();
      formData.append("file", img);
      onUploadServer(formData, id);
      event.target.value = null;
    }
  }, []);

  const onUploadServer = (formData, id) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}uploader/iapi/image`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        setImage(json.data.path);
        onReturnFile(json.data.path);
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

  return (
    <div className="flex flex-row w-full flex-1 justify-end">
      <div
        id="drop-zone"
        className="sm:w-[320px] sm:h-[320px] min-w-[300px] min-h-[300px] w-full h-fit bg-box-bg rounded-2xl flex flex-col  border-2 border-drop-border border-dashed relative"
        onMouseEnter={() => setShowChooseImage(true)}
        onMouseLeave={() => setShowChooseImage(false)}
      >
        <div
          className={`z-[1] w-full h-full flex flex-col justify-center items-center absolute left-0 top-0 backdrop-blur-sm rounded-2xl ${
            showChooseImage || image === "" ? "flex" : "hidden"
          }`}
        >
          <label className="rounded-lg py-3 px-6 cursor-pointer w-full h-full flex flex-col justify-center items-center">
            <img src={IcAddImage} alt="upload" className="w-12 h-12" />
            <p className="text-xl text-gray-4 font-montserrat_bold font-bold mt-4">
              Add your logo here
            </p>
            <p className="text-sm text-grey-6 mt-1 font-montserrat font-normal px-16 text-center">
              {`(.JPEG/ .JPG/ .PNG Size: 480 x 480 (px) - 2MB )`}
            </p>
            <input
              type="file"
              name="myImage"
              className="hidden w-full h-full"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={(e) => onUploadImage(e, "drop-zone")}
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

export default UploadField;
