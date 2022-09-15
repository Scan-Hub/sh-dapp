import { createSlice } from "@reduxjs/toolkit";
import { getKYC, getMyProjects } from "../../actions";

const initialState = {
  kyc: null,
  myProjects: null,
};

const userProjectSlice = createSlice({
  name: "userProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKYC.fulfilled, (state, actions) => {
        state.kyc = actions.payload;
      })
      .addCase(getMyProjects.fulfilled, (state, actions) => {
        state.myProjects = actions.payload?.items;
      });
  },
});
export const {} = userProjectSlice.actions;
export default userProjectSlice.reducer;

export const selectDataKYC = (state) => state.userProject.kyc;
export const selectMyProjects = (state) => state.userProject.myProjects;
