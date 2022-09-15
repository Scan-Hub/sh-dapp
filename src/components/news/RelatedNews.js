import PropTypes from "prop-types"
import clsx from "clsx"
import { useNavigate } from "react-router-dom"
import get from "lodash/get"
import ic_more from "../../assets/images/news/ic_more.svg"
import iconPinkHeart from "../../assets/images/news/ic_pink_heart.svg"

import SocialMedia from "./SocialMedia"

function RelatedNews(props) {
  const { className, title, data } = props
  const navigate = useNavigate()

  return (
    <div className={clsx("w-[440px]", className)}>
      <div className="text-green-text-profile text--semibold-xl mb-6 capitalize">
        {title}
      </div>
      <div className="flex flex-col gap-y-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-box-bg rounded-lg w-[440px] cursor-pointer"
            onClick={() => {
              navigate(`/news/${item._id}`)
            }}
          >
            <div className="p-3 flex flex-row gap-x-6 gap-y-3.5">
              <div className="basis-1/3 ">
                <div className="w-[180px] rounded-lg overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="basis-2/3 relative">
                <div className="max-w-[180px] text--overflow">
                  <div className="text--semibold-lg mb-3.5">{item.title}</div>
                </div>
                <div className="cursor-pointer absolute right-0 top-0">
                  <img src={ic_more} alt="a" />
                </div>
                <div className="text-border">
                  <div className="text--overflow text--sm mb-2">
                    <div className="mr-1">Written by </div>
                    <div className="text--semibold-sm text-[#ADB2DB] overflow-hidden max-w-[120px]">
                      {item.created_by}
                    </div>
                  </div>

                  <SocialMedia
                    like={get(item, "like", 0)}
                    dislike={get(item, "dislike", 0)}
                    view={get(item, "view", 0)}
                    comment={get(item, "view", 0)}
                    className="text--regular grid grid-cols-2 gap-x-6 gap-y-2"
                    icon={{
                      like: iconPinkHeart
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

RelatedNews.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default RelatedNews
