import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "../actions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch(request());
    userService.getProfile({}).then(
      (dataRes) => {
        dispatch(success(dataRes));
        return dataRes;
      },
      (error) => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error.errorMessage));
      }
    );
  } catch (error) {
    dispatch(failure(error));
  }

  function request() {
    return { type: userConstants.USER_PROFILE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.USER_PROFILE_SUCCESS, payload: user.data };
  }
  function failure(error) {
    return { type: userConstants.USER_PROFILE_FAILURE, error };
  }
};

export const updateProfile = (dataReq) => async (dispatch, getState) => {
  if (dataReq) {
    try {
      dispatch(request(dataReq));
      userService.updateProfile(dataReq).then(
        (dataRes) => {
          dispatch(success(dataRes));

          dispatch(getProfile());
          dispatch(
            alertActions.success({
              status: "success",
              title: "Updated information successfully",
            })
          );
          dispatch(getProfile());

          return dataRes;
        },
        (error) => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error.errorMessage));
        }
      );
    } catch (error) {
      dispatch(failure(error));
    }

    function request(data) {
      return { type: userConstants.USER_EDIT_REQUEST, payload: data };
    }
    function success(data) {
      return { type: userConstants.USER_EDIT_SUCCESS, payload: data };
    }
    function failure(error) {
      return { type: userConstants.USER_EDIT_FAILURE, payload: error };
    }
  }
};

export const getKYC = createAsyncThunk(
  userConstants.getKYC,
  async (_, { rejectWithValue }) => {
    try {
      const res = await userService.getKYCVerified();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMyProjects = createAsyncThunk(
  userConstants.getMyProjects,
  async (params, { rejectWithValue }) => {
    try {
      const res = await userService.getMyProjects(params);
      const { data } = res;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
