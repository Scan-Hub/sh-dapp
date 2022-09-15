import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import get from "lodash/get"
// import iconYtb from "../../../assets/images/video-card/icon-ytb.svg"
import SocialMedia from "../SocialMedia"
import "./index.scss"

const NewsItem = (props) => {
  const {
    item,
    color,
    title,
    thumbnail,
    createdByLabel = "Written by",
    createdBy,
    type = "card",
    onClick
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
            sandbox="allow-same-origin allow-scripts allow-forms"
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
        className="object-cover w-full h-full"
      />
    )
  }

  return (
    <div
      className={clsx("sh_news_item", {
        [color]: color,
        "cursor-pointer": onClick
      })}
      onClick={onClick && onClick}
    >
      <div className="relative w-full h-[156px] rounded overflow-hidden">
        {renderContent()}
      </div>
      <div className="body pt-4">
        <div className="text--semibold text--overflow mb-2">
          {item[title]}
        </div>
        <div className="text-[#656881]">
          <div className="text--overflow text--sm">
            <div className="mr-1">{createdByLabel} </div>
            <div className="text--semibold-sm text-[#ADB2DB] overflow-hidden">
              {get(item, createdBy, "")}
            </div>
          </div>
          <SocialMedia
            like={item.like}
            dislike={item.dislike}
            comment={item.view}
            view={item.view}
          />
        </div>
      </div>
    </div>
  )
}

NewsItem.propTypes = {
  item: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["light"]),
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  createdByLabel: PropTypes.string,
  createdBy: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NewsItem
