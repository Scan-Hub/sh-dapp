import { useEffect, useState } from "react";
import { TailSpin } from "react-loading-icons";
import PropTypes from "prop-types";
import clsx from "clsx";

import IcAddImage from "../../assets/images/profile/add_image.svg";

import { uploadService } from "../../services";
import YupErrorMessage from "../global/YupErrorMessage";

function UploadImage(props) {
  const {
    onChange: setFile,
    value: file,
    label,
    labelClassName,
    required,
    icon,
    title = "Add your logo here",
    caption = `(.JPEG/ .JPG/ .PNG Size: 480 x 480 (px) - 2MB )`,
    width = 300,
    height = 320,
    accept = "image/png,image/jpg,image/jpeg,image/gif",
    name,
    error,
    onSelect,
  } = props;

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  

  const uploadImageToServer = async (file) => {
    try {
      setLoading(true);
      const response = await uploadService.uploadImage(file);
      if (response.data.status === "success") {
        setLoading(false);
        setPreviewImage(response.data.path);
        setFile(response.data.path);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onRemoveImage = () => {
    setFile("");
    setPreviewImage("");
  };

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];

      await uploadImageToServer(file);
      event.target.value = null;
    }
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

      dropZone.addEventListener("drop", async (event) => {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;
        // const extension = files[0].type

        reader.readAsDataURL(files[0]);
        await uploadImageToServer(files[0]);
        return;
      });
    }
  };

  useEffect(() => {
    onDropImage(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!previewImage && file?.img_url) {
      setPreviewImage(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  return (
    <div className="sh_upload_field" onClick={onSelect}>
      {label && (
        <label
          className={clsx(labelClassName, {
            has_icon: icon,
          })}
        >
          {icon && <img src={icon} className="icon" alt="icon" />}
          {label}
          {required && <span className="asterisk">*</span>}
        </label>
      )}
      <div
        id={name}
        className={`relative bg-box-bg rounded-lg flex flex-col border-2 border-drop-border border-dashed`}
        style={{
          width,
          height,
        }}
      >
        {!previewImage && (
          <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-sm rounded-lg">
            <label className="rounded-lg py-3 px-6 cursor-pointer w-full h-full flex flex-col justify-center items-center">
              {typeof title !== "string" ? (
                title
              ) : (
                <>
                  <img src={IcAddImage} alt="upload" className={`${loading ? "hidden" : "flex"} w-12 h-12`} />
                  <p className="text-gray-4 text--bold mt-4">{title}</p>
                </>
              )}
              <p className="text-border text--sm mt-1.5 text-center">
                {caption}
              </p>
              <input
                type="file"
                name={name}
                className="hidden w-full h-full"
                accept={accept}
                onChange={onImageChange}
              />
            </label>
          </div>
        )}
        {previewImage && (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute w-full h-full overflow-hidden bg-white z-2 hidden hover:visibility" />
            <img
              className="object-cover w-full rounded-lg"
              style={{
                width: "calc(100% - 1px)",
                height: "calc(100% - 1px)",
              }}
              alt="select_image"
              src={previewImage}
            />
            <div className="absolute p-1 w-6 h-6 flex items-center justify-center rounded-full bg-[#f5222d] -top-2 -right-2 cursor-pointer z-[1] border-[1px] border-white">
              <span onClick={onRemoveImage} className="text-white text-lg">
                x
              </span>
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center bg-black/40 text--sm text-green-text-profile">
            <TailSpin className="w-6 h-6" fill="#00AF71" stroke="#00AF71" />
            Uploading...
          </div>
        )}

        {error && <YupErrorMessage message={error?.message} />}
      </div>
    </div>
  );
}

UploadImage.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  required: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  caption: PropTypes.string,
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default UploadImage;
