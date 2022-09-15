import clsx from "clsx"
import { TailSpin } from "react-loading-icons"
import PropTypes from "prop-types"

function LoadingScreen(props) {
  const { className, open } = props

  if (!open) return null

  return (
    <div
      className={clsx(
        "w-full h-full top-0 left-0 flex flex-col items-center justify-center text-green-text-profile",
        className
      )}
    >
      <TailSpin className="mb-2" fill="#00AF71" stroke="#00AF71" />
      Loading...
    </div>
  )
}

LoadingScreen.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool.isRequired
}

export default LoadingScreen
