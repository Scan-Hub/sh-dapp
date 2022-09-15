import { createAsyncThunk } from "@reduxjs/toolkit";
import { formConstants } from "../constants";
import { formService } from "../services";

export const submitVentureCapital = createAsyncThunk(
  formConstants.submitVentureCapital,
  async (props, { dispatch, getState }) => {
    try {
      const res = await formService.onSubmitVentureCapital(props);
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const submitApplyProject = createAsyncThunk(
  formConstants.submitApplyProject,
  async (props, { dispatch, getState }) => {
    const res = await formService.onSubmitApply(props);
    const { data } = res;
    return { data: data };
  }
);

export const submitCompany = createAsyncThunk(
  formConstants.submitCompany,
  async (props, { dispatch, getState }) => {
    try {
      const res = await formService.onSubmitCompany(props);
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const fetchFormTypes = createAsyncThunk(
  formConstants.fetchFormTypes,
  async (props, { dispatch, getState }) => {
    const res = await formService.fetchFormTypes();
    const { data } = res;
    return { data: data };
  }
);

// export const openModalSubmitForm = createAsyncThunk(
//   formConstants.MODAL_OPEN_FORM_SUBMIT,
//   async (props, { dispatch, getState }) => {
//     return { isOpen: true };
//   }
// );
