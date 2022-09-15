import { createAsyncThunk } from "@reduxjs/toolkit";
import { metadataConstants } from "../constants/metadata.constants";
import { metadataService } from "../services";

export const fetchAds = createAsyncThunk(
  metadataConstants.FETCH_ADS_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await metadataService.getAds(params);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data: data };
  }
);

export const fetchListNews = createAsyncThunk(
  metadataConstants.FETCH_NEWS_LIST_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await metadataService.getNews(params);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data, type: params.type };
  }
);

export const fetchNewsDetail = createAsyncThunk(
  metadataConstants.FETCH_NEWS_DETAIL_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await metadataService.getNewsDetail(params);
    console.log("res", res);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data };
  }
);

export const fetchFormTypes = createAsyncThunk(
  metadataConstants.FETCH_FORM_TYPES_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await metadataService.getFormTypes(params);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data };
  }
);

export const fetchFormList = createAsyncThunk(
  metadataConstants.FETCH_FORM_LIST_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param {page = 1, page_size = 10} = params
     */
    const res = await metadataService.getListForm(params);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data: data };
  }
);
export const fetchFormListScam = createAsyncThunk(
  metadataConstants.FETCH_FORM_LIST_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param {page = 1, page_size = 10} = params
     */
    const res = await metadataService.getListFormScam(params);
    const { data } = res;

    /**
     * * Can transform data here
     */
    return { data: data };
  }
);
