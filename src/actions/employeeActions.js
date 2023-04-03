import * as api from "../api/index";
import * as actionType from "../constants/employeeConstants";

export const addEmployee = (formData) => async (dispatch) => {
  try {
    dispatch({ typeof: actionType.START_LOADING });

    const newEmployee = await api.addEmployee(formData);

    dispatch({ type: actionType.EMPLOYEE_ADD_SUCCESS, payload: newEmployee });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionType.EMPLOYEE_ADD_FAIL,
      payload: message,
    });
  }
};

export const getEmployeeDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    const { data } = await api.fetchEmployee(id);

    dispatch({
      type: actionType.EMPLOYEE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionType.EMPLOYEE_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateEmployeeProfile = (id, employee) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    const { data } = await api.updateEmployee(id, employee);

    dispatch({
      type: actionType.EMPLOYEE_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    localStorage.setItem("employeeInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionType.EMPLOYEE_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const fetchEmployees = (page) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    const { data } = await api.fetchEmployees();
    const numberOfPages = parseInt(data.length / 10) + 1; // 10 is number of items per page
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedData = data.slice(startIndex, endIndex);

    dispatch({
      type: actionType.EMPLOYEE_LIST_SUCCESS,
      payload: { paginatedData, page, numberOfPages },
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionType.EMPLOYEE_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.START_LOADING,
    });

    await api.deleteEmployee(id);

    dispatch({ type: actionType.EMPLOYEE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionType.EMPLOYEE_DELETE_FAIL,
      payload: message,
    });
  }
};
