import React, { useCallback, useEffect, useState } from "react";
import YupErrorMessage from "./YupErrorMessage";
import { global } from "../../assets";

const UploadFile = ({
  className,
  title,
  uploadHint,
  recommendHint,
  accept,
  name,
  error,
  setValue,
}) => {
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const onUploadHandler = useCallback((event) => {
    console.log("onUploadImage");

    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);
      onUploadServer(formData);
      event.target.value = null;
    }
  }, []);

  const onUploadServer = async (formData) => {
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}uploader/iapi/image`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        setFileUrl(json.data.path);
        return;
      });
  };
  useEffect(() => {
    setValue(name, fileUrl);
  }, [fileUrl]);
  return (
    <div className={`${className}`}>
      <div className="w-full flex flex-row items-start space-x-6">
        <div className="flex flex-2">
          <p className="text-base text-white font-montserrat_medium font-medium ml-[2px] whitespace-nowrap">
            {title}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="flex flex-row items-center text-base font-poppins text-white border-[1px] border-text-des rounded-lg py-3 px-[22px] cursor-pointer">
            <img
              src={global.IcUploadCloud}
              alt="upload"
              className="w-6 h-6 mr-3"
            />
            <span className="text-sm text-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">
              {fileName ? fileName : uploadHint}
            </span>
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={(e) => {
                onUploadHandler(e);
              }}
            />
          </label>
          <p className="text-border font-montserrat font-normal text-base whitespace-nowrap">
            {recommendHint}
          </p>
        </div>
      </div>
      {error && <YupErrorMessage message={error.message} />}
    </div>
  );
};

export default UploadFile;
