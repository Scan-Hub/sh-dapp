import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFormTypes,
  submitApplyProject,
  submitVentureCapital,
} from "../actions/form.actions";

const initialState = {
  data: null,
  dataApplyProject: null,
  formTypes: null,
  isOpenModalSubmitForm: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    openModalSubmitForm: (state, action) => {
      state.isOpenModalSubmitForm = action.payload.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitVentureCapital.pending, (state, actions) => {});
    builder.addCase(submitVentureCapital.fulfilled, (state, actions) => {
      state.data = actions.payload.data;
    });
    builder.addCase(submitVentureCapital.rejected, (state, actions) => {});

    builder.addCase(submitApplyProject.pending, (state, actions) => {});
    builder.addCase(submitApplyProject.fulfilled, (state, actions) => {
      state.dataApplyProject = actions.payload.data;
    });
    builder.addCase(submitApplyProject.rejected, (state, actions) => {});

    builder.addCase(fetchFormTypes.pending, (state, actions) => {});
    builder.addCase(fetchFormTypes.fulfilled, (state, actions) => {
      state.formTypes = actions.payload.data;
    });
    builder.addCase(fetchFormTypes.rejected, (state, actions) => {});
  },
});
export const { openModalSubmitForm } = formSlice.actions;
export default formSlice.reducer;

export const selectVentureCapital = (state) => state.form.data;
export const selectDataApplyProject = (state) => state.form.dataApplyProject;
export const selectCategoryTypes = (state) =>
  state?.form?.formTypes &&
  state.form.formTypes.filter((e) => e.type === "category_type");
export const selectAuditCompanyTypes = (state) =>
  state?.form?.formTypes &&
  state.form.formTypes.filter((e) => e.type === "audit_company");
export const selectChain = (state) =>
  state?.form?.formTypes &&
  state.form.formTypes.filter((e) => e.type === "chain");
export const selectSectorOfInvestment = (state) =>
  state?.form?.formTypes &&
  state.form.formTypes.filter((e) => e.type === "sector_of_investment");
export const selectStageOfInvestment = (state) =>
  state?.form?.formTypes &&
  state.form.formTypes.filter((e) => e.type === "stage_of_investment");
export const selectIndustry = (state) =>
  state?.form?.formTypes &&
  state.form.formTypes.filter((e) => e.type === "industry");
export const selectIsOpenModalSubmitForm = (state) =>
  state.form.isOpenModalSubmitForm;
