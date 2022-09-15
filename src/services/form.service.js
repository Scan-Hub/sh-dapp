import axiosClient from "./axiosClient";

const route = "partner/kyc";

export const formService = {
  onSubmitVentureCapital: (params) => {
    console.log("params", params);
    return axiosClient.post(`${route}/capital`, params);
  },
  onSubmitApply: (params) => {
    return axiosClient.post(`metadata/form`, params);
  },
  fetchFormTypes: () => {
    return axiosClient.get(`metadata/form_types`);
  },
  onSubmitCompany: (params) => {
    console.log("params", params);
    return axiosClient.post(`${route}/company`, params);
  },
};
