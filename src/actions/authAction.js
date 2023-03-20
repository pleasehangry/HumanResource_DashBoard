import { AUTH } from "../constants/employeeConstants";
import * as api from "../api/index";

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

export const register = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {}
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
