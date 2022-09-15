import axiosClient from "./axiosClient"
import { VIDEO_REVIEW_LIST_VIDEO_ENDPOINT } from "./endpoint"

export const videoService = {
  geListVideoReview: () => {
    return axiosClient.get(VIDEO_REVIEW_LIST_VIDEO_ENDPOINT)
  }
}
