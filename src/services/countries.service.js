import axiosClient from "./axiosClient";
import { COUNTRIES_ISO, COUNTRIES_FLAG_DIAL } from "./endpoint";

export const countriesService = {
  getCountriesISO: (queryParams) => {
    return axiosClient.get(COUNTRIES_ISO, {
      params: queryParams,
    });
  },
  getCountriesFlagDial: (queryParams) => {
    return axiosClient.get(COUNTRIES_FLAG_DIAL, {
      params: queryParams,
    });
  },
};
