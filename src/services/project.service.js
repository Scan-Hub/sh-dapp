import axiosClient from "./axiosClient";
import {
  METADATA_FEED_CMC_ENDPOINT,
  PROJECT_DETAIL_FORM_ENDPOINT,
} from "./endpoint";

export const projectService = {
  getProjectInfoOnCMC: (queryParams) => {
    return axiosClient.get(METADATA_FEED_CMC_ENDPOINT, {
      params: queryParams,
    });
  },
  getFullDetailForm: (id) => {
    return axiosClient.get(PROJECT_DETAIL_FORM_ENDPOINT(id));
  },
};
