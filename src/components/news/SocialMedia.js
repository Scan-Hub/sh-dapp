import clsx from "clsx"
import PropTypes from "prop-types"
import { card } from "../../assets"
import iconSave from "../../assets/images/news/ic_save.svg"
import { fNumber } from "../../utils/formatNumber"

function SocialMedia(props) {
  const {
    className,
    like,
    dislike,
    comment,
    view,
    showView = true,
    showBookmark = false,
    icon = {
      like: null,
      dislike: null,
      comment: null,
      view: null
    }
  } = props

  return (
    <div
      className={clsx(
        "social_media flex flex-row justify-between text--sm",
        className
      )}
    >
      <div className="flex flex-row gap-x-2">
        <img src={icon.like || card.IcHeart} alt="ic_heart" />
        <span className="text--regular">{fNumber(like || 0, "0a")}</span>
      </div>
      <div className="flex flex-row gap-x-2">
        <img src={icon.dislike || card.IcThumbDown} alt="ic_thumb_down" />
        <span className="text--regular">{fNumber(dislike || 0, "0a")}</span>
      </div>
      <div className="flex flex-row gap-x-2">
        <img src={icon.comment || card.IcComment} alt="ic_comment" />
        <span className="text--regular">{fNumber(comment || 0, "0a")}</span>
      </div>
      {showView && (
        <div className="flex flex-row gap-x-2">
          <img src={icon.view || card.IcEyes} alt="ic_eyes" />
          <span className="text--regular">{fNumber(view || 0, "0a")}</span>
        </div>
      )}
      {showBookmark && (
        <div className="flex flex-row gap-x-2">
          <img src={iconSave} className="w-[14px]" alt="ic_eyes" />
          <span className="text--regular">{fNumber(view || 0, "0a")}</span>
        </div>
      )}
    </div>
  )
}

SocialMedia.propTypes = {
  className: PropTypes.string,
  like: PropTypes.number.isRequired,
  dislike: PropTypes.number.isRequired,
  comment: PropTypes.number.isRequired,
  view: PropTypes.number.isRequired,
  icon: PropTypes.shape({
    like: PropTypes.node,
    dislike: PropTypes.node,
    comment: PropTypes.node,
    view: PropTypes.node
  }),
  showView: PropTypes.bool,
  showBookmark: PropTypes.bool
}

export default SocialMedia
