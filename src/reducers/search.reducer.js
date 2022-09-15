import { createSlice } from "@reduxjs/toolkit"
import { fetchSearchEngine } from "../actions"

const initialState = {
  loading: false,
  error: null,
  data: []
}

const searchSlice = createSlice({
  name: "search",
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
       * * fetchSearchEngine
       */
      .addCase(fetchSearchEngine.pending, (state, action) => {
        state.loading = true
        state.error = null
        state.data = []
      })
      .addCase(fetchSearchEngine.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data?.result
      })
      .addCase(fetchSearchEngine.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default searchSlice.reducer

export const { save } = searchSlice.actions

export const selectLisSearch = (state) => state.search.data

// export const selectLisSearchVideos = (state) => state.search.data

export const selectListDataSearchType = (state, type) => {
  const items = state.search.data.filter((item) => item.type === type)
  if (items) {
    return items[0]
  }
}
