import { createSlice } from "@reduxjs/toolkit";
import { fetchProjectInfoOnCMC, fetchProjectFullDetailForm } from "../actions";

const initialState = {
  metaDataFeedCMC: {
    loading: false,
    items: [],
  },
  fullDetailForm: {
    loading: false,
    items: {},
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    save(state, action) {
      const { value, key } = action.payload;
      state[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectInfoOnCMC.pending, (state, action) => {
        state.metaDataFeedCMC.loading = true;
      })
      .addCase(fetchProjectInfoOnCMC.fulfilled, (state, action) => {
        state.metaDataFeedCMC.loading = false;
        state.metaDataFeedCMC.items = action.payload.data;
      })
      .addCase(fetchProjectInfoOnCMC.rejected, (state, action) => {
        state.metaDataFeedCMC.loading = false;
      })

      .addCase(fetchProjectFullDetailForm.pending, (state, action) => {
        state.fullDetailForm.loading = true;
      })
      .addCase(fetchProjectFullDetailForm.fulfilled, (state, action) => {
        state.fullDetailForm.loading = false;
        state.fullDetailForm.items = action.payload.data;
      })
      .addCase(fetchProjectFullDetailForm.rejected, (state, action) => {
        state.fullDetailForm.loading = false;
      });
  },
});

export default projectSlice.reducer;

// export const {} = projectSlice.actions;
export const selectMetaDataFeedCMC = (state) => state.project.metaDataFeedCMC;
export const selectFullDetailForm = (state) => state.project.fullDetailForm;
