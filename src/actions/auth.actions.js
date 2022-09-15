import { createAsyncThunk } from "@reduxjs/toolkit";
import { authConstants } from "../constants/auth.constants";
import { authService } from "../services";
import { LocalStorageService } from "../_helpers";
import { alertActions } from "./alert.actions";
import * as actions from '.';

export const authLogin = (dataReq) => async (dispatch, getState) => {
  if (dataReq) {
    try {
      dispatch(request(dataReq));
      authService.login(dataReq).then(
        (res) => {
          const { data } = res;
          if (data && data.access_token) {
            LocalStorageService.setToken(data);
            dispatch(success(data));
            dispatch(actions.getProfile() );
          }
          return data;
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error.msg));
        }
      );
    } catch (error) {
      dispatch(failure(error));
    }

    function request(data) {
      return { type: authConstants.AUTH_LOGIN_REQUEST, payload: data };
    }
    function success(data) {
      return { type: authConstants.AUTH_LOGIN_SUCCESS, payload: data };
    }
    function failure(error) {
      return { type: authConstants.AUTH_LOGIN_FAILURE, error };
    }

  }
};

export const authLoginTron = (dataReq) => async (dispatch, getState) => {
  if (dataReq) {
    try {
      dispatch(request(dataReq));
      authService.loginTron(dataReq).then(
        (res) => {
          const { data } = res;
          if (data && data.access_token) {
            LocalStorageService.setToken(data);
            dispatch(success(data));
            dispatch(actions.getProfile());
          }
          return data;
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error.errorMessage));
        }
      );
    } catch (error) {
      dispatch(failure(error));
    }

    function request(data) {
      return { type: authConstants.AUTH_LOGIN_REQUEST, payload: data };
    }
    function success(data) {
      return { type: authConstants.AUTH_LOGIN_SUCCESS, payload: data };
    }
    function failure(error) {
      return { type: authConstants.AUTH_LOGIN_FAILURE, error };
    }
    
  }
};

export const authLoginGoogle = createAsyncThunk(
  authConstants.loginGoogle,
  async (props, { dispatch, getState }) => {

    const res = await authService.loginGoogle(props);
    const { data } = res;

    if (data && data.access_token) {
      LocalStorageService.setToken(data);
      LocalStorageService.setDataGoogle({...data.user,...props});
    }

    await dispatch(actions.getProfile());

    return {data:data};

  }
);

export const authLogoutGoogle = createAsyncThunk(
  authConstants.logoutGoogle,
  async (props, { dispatch, getState }) => {
    dispatch(authLogout())
    LocalStorageService.clearToken();
  }
);

export const authLogout = () => async (dispatch, getState) => {
  dispatch({ type: authConstants.AUTH_DESTROY_SESSION });
  localStorage.clear();
};
