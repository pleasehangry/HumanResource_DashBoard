import * as actionType from "../constants/employeeConstants";

const initialState = {
  employees: [],
  currentPage: 1,
  numberOfPage: 1,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.START_LOADING:
      return { ...state, loading: true };
    case actionType.EMPLOYEE_DETAILS_SUCCESS:
      return { ...state, loading: false, employeeInfo: action.payload };
    case actionType.EMPLOYEE_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case actionType.EMPLOYEE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: [...employees, action.payload],
      };
    case actionType.EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.numberOfPage,
      };
    case actionType.EMPLOYEE_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? employee : action.payload
        ),
      };
    case actionType.EMPLOYEE_DETAILS_FAIL:
    case actionType.EMPLOYEE_LIST_FAIL:
    case actionType.EMPLOYEE_DELETE_FAIL:
    case actionType.EMPLOYEE_UPDATE_PROFILE_FAIL:
    case actionType.EMPLOYEE_ADD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default employeeReducer;
