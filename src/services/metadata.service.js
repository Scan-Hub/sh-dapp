import axiosClient from "./axiosClient";
import {
  METADATA_ADS_ENDPOINT,
  METADATA_FAKE_VOTE_ENDPOINT,
  METADATA_NEWS_ENDPOINT,
  METADATA_FORM_DETAIL_ENDPOINT,
  METADATA_FORM_ENDPOINT,
  METADATA_FORM_SCAM_ENDPOINT,
  METADATA_FORM_TYPES_ENDPOINT,
  METADATA_NEWS_DETAIL_ENDPOINT,
} from "./endpoint";

export const metadataService = {
  getAds: () => {
    return axiosClient.get(METADATA_ADS_ENDPOINT);
  },
  getNews: (params) => {
    console.log("params", params);
    return axiosClient.get(METADATA_NEWS_ENDPOINT, {
      params,
    });
  },
  getNewsDetail: (id) => {
    return axiosClient.get(METADATA_NEWS_DETAIL_ENDPOINT(id));
  },
  getFormTypes: () => {
    return axiosClient.get(METADATA_FORM_TYPES_ENDPOINT);
  },
  getListForm: (params) => {
    return axiosClient.get(METADATA_FORM_ENDPOINT, {
      params,
    });
  },
  getListFormScam: (params) => {
    return axiosClient.get(METADATA_FORM_SCAM_ENDPOINT, {
      params,
    });
  },
  getDetailForm: (id) => {
    return axiosClient.get(METADATA_FORM_DETAIL_ENDPOINT(id));
  },
  createForm: (body) => {
    return axiosClient.get(METADATA_FORM_ENDPOINT, {
      data: body,
      method: "POST",
    });
  },
  fakeVote: (id) => {
    return axiosClient.get(METADATA_FAKE_VOTE_ENDPOINT(id), {
      method: "POST",
    });
  },
};
