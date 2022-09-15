import { createAsyncThunk } from "@reduxjs/toolkit"
import { exploreConstants } from "../constants/explore.constants"
import { exploreService } from "../services"

export const fetchHotKeyword = createAsyncThunk(
  exploreConstants.FETCH_HOT_KEYWORD_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await exploreService.getHotKeyword(params)
    const { data } = res

    /**
     * * Can transform data here
     */
    return { data: data }
  }
)

export const fetchListTrending = createAsyncThunk(
  exploreConstants.FETCH_LIST_TRENDING_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param params
     */
    const res = await exploreService.getListTrending(params)
    const { data } = res

    /**
     * * Can transform data here
     */
    return { data: data }
  }
)

export const fetchListRecently = createAsyncThunk(
  exploreConstants.FETCH_LIST_RECENT_REQUEST,
  async (params, { dispatch, getState }) => {
    /**
     * @param params
     */
    const res = await exploreService.getListRecently(params)
    const { data } = res

    /**
     * * Can transform data here
     */
    return { data: data }
  }
)

export const fetchListRelative = createAsyncThunk(
  exploreConstants.FETCH_RELATIVE_REQUEST,
  async (params, { dispatch, getState }) => {
    /**
     * @param params
     */
    const res = await exploreService.getListRelative(params)
    const { data } = res

    /**
     * * Can transform data here
     */
    return { data: data }
  }
)
