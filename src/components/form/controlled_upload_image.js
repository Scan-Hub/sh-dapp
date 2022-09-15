import { useEffect, useState } from "react"
// import { Controller } from "react-hook-form"
import { TailSpin } from "react-loading-icons"
import PropTypes from "prop-types"
import clsx from "clsx"

import IcDeleteImage from "../../assets/images/profile/delete.svg"
import IcAddImage from "../../assets/images/profile/add_image.svg"

import { uploadService } from "../../services"

function ControlledUploadImage(props) {
  const {
    onChange: setFile,
    value: file,
    errors,
    label,
    labelClassName,
    required,
    icon,
    title = "Add your logo here",
    caption = `(.JPEG/ .JPG/ .PNG Size: 480 x 480 (px) - 2MB )`,
    width = 300,
    height = 320,
    // maxSize = 2000000, //TODO: validate this
    accept = "image/png,image/jpg,image/jpeg,image/gif"
  } = props

  const [previewImage, setPreviewImage] = useState()
  const [loading, setLoading] = useState(false)

  const uploadImageToServer = async (file) => {
    try {
      setLoading(true)
      const response = await uploadService.uploadImage(file)
      if (response.data.status === "success") {
        setLoading(false)
        setPreviewImage(response.data.path)
        setFile(response.data.path)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const onRemoveImage = () => {
    setFile(null)
    setPreviewImage(null)
  }

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0]

      await uploadImageToServer(file)
      event.target.value = null
    }
  }

  const onDropImage = (id) => {
    const dropZone = document.getElementById(id)
    const reader = new FileReader()
    if (window.FileList && window.File) {
      dropZone.addEventListener("dragover", (event) => {
        event.stopPropagation()
        event.preventDefault()
        event.dataTransfer.dropEffect = "copy"
      })

      dropZone.addEventListener("drop", async (event) => {
        event.stopPropagation()
        event.preventDefault()
        const files = event.dataTransfer.files
        // const extension = files[0].type

        reader.readAsDataURL(files[0])
        await uploadImageToServer(files[0])
        return
      })
    }
  }

  useEffect(() => {
    onDropImage("drop-zone")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!previewImage && file) {
      setPreviewImage(file)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  return (
    <div className="sh_upload_field">
      {label && (
        <label
          className={clsx(labelClassName, {
            has_icon: icon
          })}
        >
          {icon && <img src={icon} className="icon" alt="icon" />}
          {label}
          {required && <span className="asterisk">*</span>}
        </label>
      )}
      <div
        id="drop-zone"
        className={`relative bg-box-bg rounded-2xl flex flex-col border-2 border-drop-border border-dashed`}
        style={{
          width,
          height
        }}
      >
        {!previewImage && (
          <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-sm rounded-2xl">
            <label className="rounded-lg py-3 px-6 cursor-pointer w-full h-full flex flex-col justify-center items-center">
              {typeof title !== "string" ? (
                title
              ) : (
                <>
                  <img src={IcAddImage} alt="upload" className="w-12 h-12" />
                  <p className="text-gray-4 text--bold mt-4">{title}</p>
                </>
              )}
              <p className="text-border text--sm mt-1.5 text-center">
                {caption}
              </p>
              <input
                type="file"
                name="myImage"
                className="hidden w-full h-full"
                accept={accept}
                onChange={onImageChange}
              />
            </label>
          </div>
        )}
        {previewImage && (
          <div className="relative flex items-center justify-center overflow-hidden w-full h-full p-1">
            <div className="absolute w-full h-full overflow-hidden bg-white z-2 hidden hover:visibility" />
            <img
              className="object-cover rounded-lg"
              style={{
                width: "calc(100% - 4px)",
                height: "calc(100% - 4px)"
              }}
              alt="select_image"
              src={previewImage}
            />
            <div className="absolute p-1 rounded-full bg-[#f5222d] top-2 right-2 cursor-pointer z-10">
              <img
                src={IcDeleteImage}
                alt={"delete"}
                className="w-6 h-6"
                onClick={onRemoveImage}
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center bg-black/40 text--sm text-green-text-profile">
            <TailSpin className="mb-2" fill="#00AF71" stroke="#00AF71" />
            Uploading...
          </div>
        )}
      </div>
      {errors && (
        <div className={`help_text ${errors ? "error" : ""}`}>{errors}</div>
      )}
    </div>
  )
}

ControlledUploadImage.propTypes = {
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
  height: PropTypes.number
}

export default ControlledUploadImage
