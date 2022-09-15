import { createSlice } from "@reduxjs/toolkit"
import { fetchListReviewVideo } from "../actions"

const initialState = {
  listVideoReview: {
    loading: false,
    items: []
  }
}

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    save(state, action) {
      const { value, key } = action.payload
      state[key] = value
    }
  },
  extraReducers: (builder) => {
    builder
      /**
       * * fetchReviewVideo
       */
      .addCase(fetchListReviewVideo.pending, (state, action) => {
        state.listVideoReview.loading = true
      })
      .addCase(fetchListReviewVideo.fulfilled, (state, action) => {
        state.listVideoReview.loading = false
        state.listVideoReview.items = action.payload.data.videos
      })
      .addCase(fetchListReviewVideo.rejected, (state, action) => {
        state.listVideoReview.loading = false
      })
  }
})

export default videoSlice.reducer

// export const {} = videoSlice.actions

export const selectListVideoReview = (state) => state.video.listVideoReview
