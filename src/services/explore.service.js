import axiosClient from "./axiosClient"
import {
  SEARCH_HOT_KEYWORD_ENDPOINT,
  SEARCH_RECENTLY_ADD_ENDPOINT,
  SEARCH_RELATIVE_ENDPOINT,
  SEARCH_TRENDING_ENDPOINT
} from "./endpoint"

export const exploreService = {
  getHotKeyword: () => {
    return axiosClient.get(SEARCH_HOT_KEYWORD_ENDPOINT)
  },

  getListTrending: (queryParams) => {
    return axiosClient.get(SEARCH_TRENDING_ENDPOINT, {
      params: queryParams
    })
  },

  getListRecently: (queryParams) => {
    return axiosClient.get(SEARCH_RECENTLY_ADD_ENDPOINT, {
      params: queryParams
    })
  },

  getListRelative: (queryParams) => {
    return axiosClient.get(SEARCH_RELATIVE_ENDPOINT, {
      params: queryParams
    })
  }
}
