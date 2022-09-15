import React from "react"
import PropTypes from "prop-types"
import "./video-card.scss"

import iconArrow from "../../../assets/images/card/arrow-right.svg"
import imgUser from "../../../assets/images/video-card/user-img.png"
import imgProject from "../../../assets/images/video-card/project-img.png"
import iconYtb from "../../../assets/images/video-card/icon-ytb.svg"

const HEADER_TITLE = {
  video: {
    title: "Video review"
  },
  news: {
    title: "News"
  },
  user: {
    title: "User"
  },
  project: {
    title: "Project"
  }
}

const VideoCard = (props) => {
  const { type, layout = "video", data = [] } = props
  const total = data.length

  const renderContent = () => {
    if (layout === "video") {
      return data.map((d, index) => (
        <div className="" key={`${d.name}-${index}`}>
          <div className="relative w-[220px] mb-4">
            <iframe
              width={220}
              height={135}
              type="text/html"
              src={d.url} // Only e Embed uri https://www.youtube.com/embed/VIDEO_ID
              title={d.name}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              frameborder="0"
              allowfullscreen
            />
            <img
              className="absolute w-[40px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
              src={iconYtb}
              alt="iconYtb"
            />
          </div>
          <p className="text--regular-xs text-grey-6 text--overflow w-[220px]">
            {d.description}
          </p>
          <p className="text--semibold-sm text--overflow w-[220px]">{d.name}</p>
        </div>
      ))
    }

    if (layout === "avatar") {
      return [...Array(21)].map((a, index) => (
        <div key={index} className="flex flex-col justify-center items-center">
          <div className="w-[48px] h-[48px] md:h-[140px] md:w-[140px] mb-4 mx-[18px]">
            <img src={imgUser} alt="" />
          </div>
          <p className="text--semibold-xs md:text-sm md:font-bold">
            Justin Bieber
          </p>
        </div>
      ))
    }

    if (layout === "news") {
      return data.map((record, index) => (
        <div className="" key={index}>
          <div className="relative w-[170px] h-[100px] md:h-auto md:w-[355px] mb-4">
            <img src={record.thumbnail} alt="a" />
          </div>
          <div
            className="text--regular-xs text-grey-6 text--overflow w-[320px]"
            dangerouslySetInnerHTML={{ __html: record.content }}
          ></div>
          <p className="text--semibold-sm text--overflow w-[320px]">
            {record.title}
          </p>
        </div>
      ))
    }

    return [...Array(2)].map((_, index) => (
      <div className="space-y-4" key={index}>
        <div className="w-[240px] h-[128px] md:w-[425px] md:h-auto ">
          <img
            src={imgProject}
            alt=""
            className="h-full md:h-auto object-cover object-left rounded"
          />
        </div>
        <p className="text--semibold-sm">VeBank - One stop DeFi protocol</p>
      </div>
    ))
  }

  return (
    <div className="mt-6 overflow-hidden w-full">
      <div className="flex justify-between items-center text-green-text-profile">
        <p className="text--bold">
          {HEADER_TITLE[type].title} ({total})
        </p>
        <div className="flex justify-between cursor-pointer items-center">
          <p className="text-green-text-profile text--sm">More</p>
          <img src={iconArrow} alt="more" className="ml-3" />
        </div>
      </div>
      <div
        className={`flex items-center mt-6 overflow-x-auto cus_scrollbar scroll-smooth ${
          layout === "avatar" ? "gap-x-6 md:gap-x-12" : "gap-x-8 pb-2"
        }  pb-2`}
      >
        {renderContent()}
      </div>
    </div>
  )
}

VideoCard.propTypes = {
  layout: PropTypes.oneOf(["card", "avatar", "video", "news"]),
  type: PropTypes.oneOf(["user", "video", "project", "news"])
}

export default VideoCard
