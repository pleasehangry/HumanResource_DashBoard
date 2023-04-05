import { AUTH_FAIL, AUTH, START_LOADING } from "../constants/employeeConstants";
import * as api from "../api/index";

export const login = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.login(formData);

    dispatch({ type: AUTH, data });

    router("/");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTH_FAIL,
      payload: message,
    });
  }
};

export const register = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    console.log(data);

    dispatch({ type: AUTH, data });

    router("/detail_infor");
  } catch (errors) {
    const message =
      errors.response && errors.response.data
        ? errors.response.data
        : errors.message;
    console.log(errors);
    dispatch({
      type: AUTH_FAIL,
      payload: message,
    });
  }
};

export const logout = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.logout(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
