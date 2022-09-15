export const userConstants = {
  /** PROFILE  */
  USER_PROFILE_REQUEST: "USER_PROFILE_REQUEST",
  USER_PROFILE_SUCCESS: "USER_PROFILE_SUCCESS",
  USER_PROFILE_FAILURE: "USER_PROFILE_FAILURE",

  /** EDIT  */
  USER_EDIT_REQUEST: "USER_EDIT_REQUEST",
  USER_EDIT_SUCCESS: "USER_EDIT_SUCCESS",
  USER_EDIT_FAILURE: "USER_EDIT_FAILURE",
  OPEN_EDIT_PROFILE: "OPEN_EDIT_PROFILE",
  CLOSE_EDIT_PROFILE: "CLOSE_EDIT_PROFILE",

  /* KYC */
  getKYC: "getKYC",
  getMyProjects: "getMyProjects",
};

 /* Status of KYC user */
export const statusKYC = {
  SUBMITTED: "submitted",
  APPROVED: "approved",
  IN_REVIEW: "in_review",
  NOT_START: "not_start",
  REJECTED: "rejected",
};
export const titlesBtnKYC = {
  SUBMITTED: "Verifying",
  APPROVED: "Verified",
  IN_REVIEW: "Verifying",
  NOT_START: "Verify user",
  REJECTED: "Verify user",
};
