import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import get from "lodash/get"
// import iconYtb from "../../../assets/images/video-card/icon-ytb.svg"
import { card } from "../../../assets"

import "./card.scss"

const ShCard = (props) => {
  const {
    item,
    color,
    title,
    thumbnail,
    createdByLabel = "Written by",
    createdBy,
    type = "card"
  } = props

  const renderContent = () => {
    if (type === "video") {
      return (
        <div className="relative w-full">
          <iframe
            className="w-full"
            height="156px"
            type="text/html"
            src={item.video_link} // Only e Embed uri https://www.youtube.com/embed/VIDEO_ID
            title={item[title]}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
          {/* <img
            className="absolute w-[40px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            src={iconYtb}
            alt="iconYtb"
          /> */}
        </div>
      )
    }
    return (
      <img
        src={item[thumbnail]}
        alt={item[title]}
        className="object-cover max-w-full h-full"
      />
    )
  }

  return (
    <div
      className={clsx("sh_card", {
        [color]: color
      })}
    >
      <div className="relative w-full h-[156px] overflow-hidden">
        {renderContent()}
      </div>
      <div className="body pt-4">
        <div className="text--semibold text--overflow two_lines mb-2">
          {item[title]}
        </div>
        <div className="text-[#656881]">
          <div className="text--sm">
            {createdByLabel}{" "}
            <span className="text--semibold-sm text-[#ADB2DB]">
              {get(item, createdBy, "Ariana Grande")}
            </span>
          </div>
          <div className="social_media flex flex-row justify-between text--sm">
            <div className="flex flex-row gap-x-2">
              <img src={card.IcHeart} alt="ic_heart" />
              {item.like || 0}
            </div>
            <div className="flex flex-row gap-x-2">
              <img src={card.IcThumbDown} alt="ic_thumb_down" />
              {item.dislike || 0}
            </div>
            <div className="flex flex-row gap-x-2">
              <img src={card.IcComment} alt="ic_comment" />
              {item.view || 0}
            </div>
            <div className="flex flex-row gap-x-2">
              <img src={card.IcEyes} alt="ic_eyes" />
              {item.view || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ShCard.propTypes = {
  item: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["light"]),
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  createdByLabel: PropTypes.string,
  createdBy: PropTypes.string.isRequired
}

export default ShCard
