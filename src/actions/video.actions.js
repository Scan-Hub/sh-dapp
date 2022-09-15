import { createAsyncThunk } from "@reduxjs/toolkit"
import { videoConstants } from "../constants/video.constants"
import { videoService } from "../services"

export const fetchListReviewVideo = createAsyncThunk(
  videoConstants.FETCH_VIDEO_REVIEW_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await videoService.geListVideoReview(params)
    const { data } = res

    /**
     * * Can transform data here
     */
    return { data: data }
  }
)
