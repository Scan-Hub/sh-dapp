import { createSlice } from "@reduxjs/toolkit";
import { authLoginGoogle, authLogoutGoogle } from "../actions";

function getAccountGoogle(){
  const  dataGoogle = localStorage.getItem('dataGoogle')
  if(dataGoogle){
    return JSON.parse(dataGoogle.toString());
  }
  return null;
}

const initialState = {
  dataGoogle: getAccountGoogle(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateDataGoogle: (state, action) => {
      state.dataGoogle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLoginGoogle.fulfilled, (state, action) => {
        state.dataGoogle = action.payload.data;
      })
      .addCase(authLogoutGoogle.rejected, (state, action) => {
        state.dataGoogle = null;
      })
  },
});

export default authSlice.reducer;

export const { updateDataGoogle } = authSlice.actions;

export const selectDataGoogle = (state) => state.auth.dataGoogle;
