import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListRecently,
  fetchListTrending,
  fetchListRelative,
  fetchHotKeyword,
} from "../actions";

const initialState = {
  listRecently: {
    loading: false, // control loading
    items: [],
  },
  listTrending: {
    loading: false,
    items: [],
  },
  listRelative: {
    loading: false,
    items: [],
  },
  listHotKeyword: {
    loading: false,
    items: [],
  },
};

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    save(state, action) {
      const { value, key } = action.payload;
      state[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * * fetchHotKeyword
       */
      .addCase(fetchHotKeyword.pending, (state, action) => {
        state.listHotKeyword.loading = true;
      })
      .addCase(fetchHotKeyword.fulfilled, (state, action) => {
        state.listHotKeyword.loading = false;
        state.listHotKeyword.items = action.payload.data.keywords;
      })
      .addCase(fetchHotKeyword.rejected, (state, action) => {
        state.listHotKeyword.loading = false;
      })
      /**
       * * fetchListRecently
       */
      .addCase(fetchListRecently.pending, (state, action) => {
        state.listRecently.loading = true;
      })
      .addCase(fetchListRecently.fulfilled, (state, action) => {
        state.listRecently.loading = false;
        state.listRecently.items = action.payload.data.items;
      })
      .addCase(fetchListRecently.rejected, (state, action) => {
        state.listRecently.loading = false;
      })
      /**
       * * fetchListTrending
       */
      .addCase(fetchListTrending.pending, (state, action) => {
        state.listTrending.loading = true;
      })
      .addCase(fetchListTrending.fulfilled, (state, action) => {
        state.listTrending.loading = false;
        state.listTrending.items = action.payload.data.trends || [];
      })
      .addCase(fetchListTrending.rejected, (state, action) => {
        state.listTrending.loading = false;
      })
      /**
       * * fetchListRelative
       */
      .addCase(fetchListRelative.pending, (state, action) => {
        state.listRelative.loading = true;
      })
      .addCase(fetchListRelative.fulfilled, (state, action) => {
        state.listRelative.loading = false;
        state.listRelative.items = action.payload.data.items;
      })
      .addCase(fetchListRelative.rejected, (state, action) => {
        state.listRelative.loading = false;
      });
  },
});

export default exploreSlice.reducer;

// export const {} = exploreSlice.actions

export const selectListRecently = (state) => state.explore.listRecently;

export const selectListTrending = (state) => state.explore.listTrending;

export const selectListRelative = (state) => state.explore.listRelative;

export const selectListHotKeyword = (state) => state.explore.listHotKeyword;
