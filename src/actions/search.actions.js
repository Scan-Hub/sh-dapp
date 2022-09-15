import { createAsyncThunk } from "@reduxjs/toolkit"
import { searchConstants } from "../constants"
import { searchService } from "../services"

export const fetchSearchEngine = createAsyncThunk(
  searchConstants.FETCH_SEARCH_LIST_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param {page = 1, page_size = 10} = params
     */
    const res = await searchService.getListSearch(params)
    const { data } = res

    /**
     * * Can transform data here
     */
    return { data: data }
  }
)

export const queryCustomFormFilter = createAsyncThunk(
  searchConstants.QUERY_CUSTOM_FORM_REQUEST,
  async (params, { dispatch, getState, rejectWithValue }) => {
    /**
     * @param { chain_id: "", category: "", entity: "", kyc: "", audit: "", ratings: []  }  = params
     */
    const res = await searchService.queryFormFilter(params)
    const { data } = res

    /**
     * * Can transform data here
     */
    return { data: data }
  }
)
