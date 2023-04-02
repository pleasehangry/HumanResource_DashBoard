import {
  AUTH,
  AUTH_FAIL,
  LOGOUT,
  START_LOADING,
} from "../constants/employeeConstants";

const authReducer = (
  state = { authData: null, loading: false, errors: null },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };
    case AUTH_FAIL:
      return { ...state, loading: false, errors: action.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
