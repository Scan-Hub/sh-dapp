import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const FindType = {
  JOB: 0,
  TALENT: 1,
};

const initialState = {
  selectedTab: FindType.JOB,
  jobData: {},
  talent: {},
};

const scanJobSlice = createSlice({
  name: "ScanJobSlice",
  initialState,
  reducers: {
    selectTab: (state, action) => {
      if (action.payload !== null) state.selectedTab = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(filter.fulfilled, (state, action) => {
        state.jobData = action.payload;
      })
      .addCase(filter.rejected, (state, action) => {}),
});

const filter = createAsyncThunk("scanJob/filter", async (data) => {
  // TODO: Filter data
  return {};
});

export default scanJobSlice.reducer;

export const { selectTab } = scanJobSlice.actions;

export const selectSelectedTab = (state) => state.scanJob.selectedTab;
