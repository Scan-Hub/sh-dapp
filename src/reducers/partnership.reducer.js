import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { partnerService } from "../services/partner.service";

export const FindType = {
  Company: "company",
  Capital: "capital",
  Marketing: "marketing",
  Launchpad: "launchpad",
  Incubator: "incubator",
  Accelerator: "accelerator",
  Talent: "talent",
};

const initialState = {
  selectedTab: FindType.Company,
  tableData: {},
  pending:false,
};

const partnerShipSlice = createSlice({
  name: "PartnerShipSlice",
  initialState,
  reducers: {
    selectTab: (state, action) => {
      if (action.payload) state.selectedTab = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(filter.pending, (state, action) => {
        state.pending = true
      })
      .addCase(filter.fulfilled, (state, action) => {
        state.tableData = action.payload;
        state.pending = false
      })
      .addCase(filter.rejected, (state, action) => {
        state.tableData = [];
        state.pending = false
       }),

});

export const filter = createAsyncThunk("partnership/filter", async (data,{dispatch}) => {
  console.log(data)
  const _data = await partnerService.getPartners(data);
  return _data.data;
});

export default partnerShipSlice.reducer;

export const { selectTab } = partnerShipSlice.actions;

export const selectSelectedTab = (state) => state.partnerShip.selectedTab;

export const selectTableData = (state) => state.partnerShip.tableData;

export const selectPending = (state) => state.partnerShip.pending;
