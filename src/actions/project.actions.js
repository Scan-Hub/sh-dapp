import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectConstants } from "../constants";
import { projectService } from "../services";

export const fetchProjectInfoOnCMC = createAsyncThunk(
  projectConstants.FETCH_METADATA_CMC_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await projectService.getProjectInfoOnCMC(params);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data: data };
  }
);

export const fetchProjectFullDetailForm = createAsyncThunk(
  projectConstants.FETCH_DETAIL_FORM_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await projectService.getFullDetailForm(params);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data: data };
  }
);
