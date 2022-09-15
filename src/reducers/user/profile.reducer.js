import { userConstants } from "../../constants";

const initialState = {
  data: null,
  requesting: false,
  isOpenEditModal: false,
};
export const openEditModal = () => ({
  type: userConstants.OPEN_EDIT_PROFILE,
});
export const closeEditModal = () => ({
  type: userConstants.CLOSE_EDIT_PROFILE,
});
export function profile(state = initialState, action) {
  switch (action.type) {
    case userConstants.OPEN_EDIT_PROFILE:
      return {
        ...state,
        isOpenEditModal: true,
      };
    case userConstants.CLOSE_EDIT_PROFILE:
      return {
        ...state,
        isOpenEditModal: false,
      };
    case userConstants.USER_PROFILE_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case userConstants.USER_PROFILE_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: action.payload,
      };
    case userConstants.USER_PROFILE_FAILURE:
      return {
        requesting: false,
        ...state,
      };
    default:
      return state;
  }
}

export const selectProfileRequestingState = (state) => state.profile.data;
export const selectSetOpenModalEditInfo = (state) =>
  state.profile.isOpenEditModal;
export const selectSetCloseModalEditInfo = (state) =>
  state.profile.closeEditModal;
