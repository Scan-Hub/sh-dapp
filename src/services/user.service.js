import axiosClient from "./axiosClient";

const route = "user";

export const userService = {
  //Get profile login information
  getProfile: () => {
    return axiosClient.get(`/oauth/${route}`);
  },

  //Update profile
  updateProfile: (params) => {
    return axiosClient.put(`/oauth/${route}`, params);
  },

  //Get KYC Verified
  getKYCVerified: () => {
    return axiosClient.get(`/partner/kyc`);
  },

  //Get list my project
  getMyProjects: (params) => {
    return axiosClient.get(`metadata/form/user`, { params });
  },
};
