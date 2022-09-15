import { createAsyncThunk } from "@reduxjs/toolkit";
import { countriesConstants } from "../constants";
import { countriesService } from "../services";

export const fetchCountriesISO = createAsyncThunk(
  countriesConstants.FETCH_COUNTRY_ISO_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await countriesService.getCountriesISO(params);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data: data };
  }
);

export const fetchCountriesFlagDial = createAsyncThunk(
  countriesConstants.FETCH_COUNTRY_FLAG_DIAL_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await countriesService.getCountriesFlagDial(params);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data: data };
  }
);
