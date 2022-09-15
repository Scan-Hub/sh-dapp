import { useForm } from "react-hook-form"
import get from "lodash/get"
import PropTypes from "prop-types"
import ControlledTextField from "../form/controlled_text_field"
import iconSend from "../../assets/images/news/ic_send.svg"
import iconSmile from "../../assets/images/news/ic_smile.svg"
import iconMore from "../../assets/images/news/ic_more.svg"
import iconReport from "../../assets/images/news/ic_report.svg"
import iconShare from "../../assets/images/news/ic_share_alt.svg"
import iconSaveOutline from "../../assets/images/news/ic_save_outline.svg"
import avatar1 from "./ex_avatar_1.png"
import avatar2 from "./ex_avatar_2.png"
import avatar3 from "./ex_avatar_3.png"
import { fUnix, fDate } from "../../utils/formatTime"
import { fNumber } from "../../utils/formatNumber"

import CommentItem from "./CommentItem"
import SocialMedia from "./SocialMedia"

function NewsComment(props) {
  const { data } = props
  const { control } = useForm({
    defaultValues: {
      comment: ""
    }
  })

  return (
    <div>
      <div className="text--bold-xl">{get(data, "title", "")}</div>
      <div className="text--regular space-x-2 mb-4">
        <span>{fNumber(get(data, "view", 0), "0,0")} views</span>
        <span>-</span>
        <span>{fDate(fUnix(get(data, "created_time")), "dd MMM yyyy")}</span>
      </div>
      <div className="flex flex-row justify-between">
        <SocialMedia
          className="gap-x-8 text--regular"
          like={get(data, "like", 0)}
          dislike={get(data, "dislike", 0)}
          comment={get(data, "view", 0)}
          showView={false}
        />
        <div className="flex flex-row gap-x-8">
          <div className="flex flex-row gap-x-2 cursor-pointer">
            <div className="inline-block">
              <img src={iconShare} alt="share" className="w-[24px] h-[24px]" />
            </div>
            <span>Share</span>
          </div>
          <div className="flex flex-row gap-x-2 cursor-pointer">
            <div className="inline-block">
              <img
                src={iconReport}
                alt="report"
                className="w-[24px] h-[24px]"
              />
            </div>
            <span>Report</span>
          </div>
          <div className="flex flex-row gap-x-2 cursor-pointer">
            <div className="inline-block">
              <img
                src={iconSaveOutline}
                alt="save"
                className="w-[24px] h-[24px]"
              />
            </div>
            <span>Save</span>
          </div>
          <div className="cursor-pointer">
            <img src={iconMore} alt="more" />
          </div>
        </div>
      </div>
      <div className="divider my-6" />
      <div className="flex flex-row items-center gap-x-4 mb-10">
        <div>
          <div className="w-[48px] h-[48px] rounded-full bg-black">
            <img src={avatar1} alt="avatar" className="w-full object-cover" />
          </div>
        </div>
        <ControlledTextField
          className="grow"
          control={control}
          required
          placeholder="Enter comment"
          name="comment"
          endAdornment={
            <img
              className="ml-4 absolute right-2"
              src={iconSmile}
              alt="ic_smile"
            />
          }
        />
        <div>
          <div className="cursor-pointer">
            <img className="w-[32px] h-[32px]" src={iconSend} alt="ic_send" />
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <CommentItem
        name="Chilling All Day"
        avatar={avatar2}
        description=" Lemon Tree - Fools Garden (Lyrics) | I wonder how, I wonder why, yesterday you told me 'bout the blue blue sky Lyrics video for 'Lemon Tree by Fools Garden.'"
      />
      <CommentItem
        name="Some Vlog"
        avatar={avatar3}
        description="Love  it!  Awesome job.  Thanks  for sharing"
      />
    </div>
  )
}

NewsComment.propTypes = {
  data: PropTypes.object
}

export default NewsComment
