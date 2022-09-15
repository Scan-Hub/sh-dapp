import get from "lodash/get"
import PropTypes from "prop-types"
import SocialMedia from "./SocialMedia"
import NewsComment from "./Comment"

import iconPinkHeart from "../../assets/images/news/ic_pink_heart.svg"

import { fUnix, fDate } from "../../utils/formatTime"

function NewsContent(props) {
  const { data } = props

  if (data && data.type === "video") {
    return (
      <div className="relative w-full">
        <iframe
          className="w-full mb-10"
          height="480px"
          type="text/html"
          src={`${data.video_link}?autoplay=1`} // Only e Embed uri https://www.youtube.com/embed/VIDEO_ID
          title={data.title}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
          allow="autoplay"
        />
        <NewsComment data={data} />
      </div>
    )
  }

  return (
    <div>
      <div className="bg-box-bg p-6 rounded-2xl space-y-6 mb-[60px]">
        <div>
          <img
            src={get(data, "thumbnail")}
            className="max-w-full h-full object-cover"
            alt="abc"
          />
        </div>
        <div className="text--semibold-3xl">{get(data, "title", "")}</div>
        <div className="flex flex-row justify-between text-border">
          <div className="text--regular-lg">
            {fDate(fUnix(get(data, "created_time")))}
          </div>
          <div>
            <SocialMedia
              className="gap-x-8 text--regular h-[20px]"
              like={get(data, "like", 0)}
              dislike={get(data, "dislike", 0)}
              comment={get(data, "view", 0)}
              view={get(data, "view", 0)}
              showBookmark
              icon={{
                like: iconPinkHeart
              }}
            />
          </div>
        </div>
      </div>
      <div className="blog_content text-text-des mb-10">
        <div
          dangerouslySetInnerHTML={{
            __html: get(data, "content", "")
          }}
        />
      </div>
      <NewsComment data={data} />
    </div>
  )
}

NewsContent.propTypes = {
  data: PropTypes.object.isRequired
}

export default NewsContent
