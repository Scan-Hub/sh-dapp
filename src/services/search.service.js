import axiosClient from "./axiosClient"

import { SEARCH_QUERY_ENDPOINT, SEARCH_QUERY_CUSTOM_ENDPOINT } from "./endpoint"

export const searchService = {
  getListSearch: (params) => {
    return axiosClient.get(SEARCH_QUERY_ENDPOINT, { params })
  },
  queryFormFilter: (params) => {
    return axiosClient.get(SEARCH_QUERY_CUSTOM_ENDPOINT, { params })
  }
}
