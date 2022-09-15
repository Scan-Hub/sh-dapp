import { createSlice } from "@reduxjs/toolkit"
import {
  fetchAds,
  fetchFormList,
  fetchFormTypes,
  fetchListNews,
  fetchNewsDetail
} from "../actions"

const initialState = {
  listAds: {
    loading: false, // control loading
    items: []
  },
  listNews: {
    loading: false,
    items: [],
    num_of_page: 0
  },
  newsDetail: {
    loading: false,
    data: null
  },
  listVideos: {
    loading: false,
    items: [],
    num_of_page: 0
  },
  listForm: {
    loading: false,
    items: [],
    num_of_page: 0
  },
  listFormTypes: {
    loading: false,
    items: []
  }
}

const metadataSlice = createSlice({
  name: "metadata", // follow api endpoint
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
       * * fetchAds
       */
      .addCase(fetchAds.pending, (state, action) => {
        state.listAds.loading = true
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.listAds.loading = false
        state.listAds.items = action.payload.data
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.listAds.loading = false
      })
      /**
       * * fetchListNews
       */
      .addCase(fetchListNews.pending, (state, action) => {
        const { type } = action.meta.arg
        if (type && type === "video") {
          state.listVideos.loading = true
        } else {
          state.listNews.loading = true
        }
      })
      .addCase(fetchListNews.fulfilled, (state, action) => {
        const { type } = action.meta.arg
        if (type && type === "video") {
          state.listVideos.loading = false
          state.listVideos.items = action.payload.data.items
          state.listVideos.num_of_page = action.payload.data.num_of_page
        } else {
          state.listNews.loading = false
          state.listNews.items = action.payload.data.items
          state.listNews.num_of_page = action.payload.data.num_of_page
        }
      })
      .addCase(fetchListNews.rejected, (state, action) => {
        const { type } = action.meta.arg
        if (type && type === "video") {
          state.listVideos.loading = false
        } else {
          state.listNews.loading = false
        }
      })
      /**
       * * fetchNewsDetail
       */
      .addCase(fetchNewsDetail.pending, (state, action) => {
        state.newsDetail.loading = true
      })
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.newsDetail.loading = false
        state.newsDetail.data = action.payload.data
      })
      .addCase(fetchNewsDetail.rejected, (state, action) => {
        state.newsDetail.loading = false
      })

      /**
       * * fetchFormTypes
       */
      .addCase(fetchFormTypes.pending, (state, action) => {
        state.listFormTypes.loading = true
      })
      .addCase(fetchFormTypes.fulfilled, (state, action) => {
        state.listFormTypes.loading = false
        state.listFormTypes.items = action.payload.data
      })
      .addCase(fetchFormTypes.rejected, (state, action) => {
        state.listFormTypes.loading = false
      })
      /**
       * * fetchFormList
       */
      .addCase(fetchFormList.pending, (state, action) => {
        state.listForm.loading = true
      })
      .addCase(fetchFormList.fulfilled, (state, action) => {
        state.listForm.loading = false
        state.listForm.items = action.payload.data.items
        state.listForm.num_of_page = action.payload.data.num_of_page
      })
      .addCase(fetchFormList.rejected, (state, action) => {
        state.listForm.loading = false
      })
  }
})

export default metadataSlice.reducer

export const { save } = metadataSlice.actions

export const selectListAds = (state) => state.metadata.listAds

export const selectListNews = (state) => state.metadata.listNews

export const selectListVideos = (state) => state.metadata.listVideos

export const selectListForm = (state) => state.metadata.listForm

export const selectListFormTypes = (state) => state.metadata.listFormTypes

export const selectNewsDetail = (state) => state.metadata.newsDetail
