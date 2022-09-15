import PropTypes from "prop-types"
import clsx from "clsx"

import IcCloudComputing from "../../assets/images/profile/cloud-computing.svg"

function ControlledUploadFile(props) {
  const {
    onChange: setFile,
    value: file,
    errors,
    label,
    labelClassName,
    required,
    icon,
    title = "Upload file:",
    caption = "Choose file to upload",
    description = "(Recommend PDF file)",
    // maxSize = 2000000, //TODO: validate this
    accept = "application/pdf"
  } = props

  // const [previewImage, setPreviewImage] = useState()
  // const [loading, setLoading] = useState(false)

  // const onRemoveImage = () => {
  //   setFile(null)
  //   setPreviewImage(null)
  // }

  // const onImageChange = async (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let file = event.target.files[0]

  //     event.target.value = null
  //   }
  // }

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

      {/* <div className="text--semibold-lg mb-3">
        Bussiness registration certificate
      </div> */}
      <div className="w-full flex gap-x-6">
        <p className="text--regular font-medium text-white mt-3">{title}</p>
        <div>
          <label className="flex flex-row items-center text--sm text-white border-[1px] border-text-des rounded-lg py-3 px-6 mb-2 cursor-pointer">
            <img src={IcCloudComputing} alt="upload" className="w-6 h-6 mr-3" />
            {caption}
            <input
              type="file"
              name="myImage"
              className="hidden"
              accept={accept}
              onChange={(e) => null}
            />
          </label>
          <p className="text--regular-xs text-border">{description}</p>
        </div>
      </div>

      {errors && (
        <div className={`help_text ${errors ? "error" : ""}`}>{errors}</div>
      )}
    </div>
  )
}

ControlledUploadFile.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  required: PropTypes.bool,
  title: PropTypes.string,
  caption: PropTypes.string,
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
}

export default ControlledUploadFile
