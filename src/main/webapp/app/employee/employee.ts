import axios from "axios";
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Employee, Page } from "./employee.model";

// Action types
export const ACTION_TYPE = {
  FIRE_EMPLOYEES_SUCCESS: "employees/FIRE_EMPLOYEES_SUCCESS",
  UPDATE_EMPLOYEE_SUCCESS: "employees/UPDATE_EMPLOYEE_SUCCESS",
  HIRE_EMPLOYEE_SUCCESS: "employees/HIRE_EMPLOYEE_SUCCESS",
  LOAD_EMPLOYEES_SUCCESS: "employees/LOAD_EMPLOYEES_SUCCESS"
};

export interface EmployeesState {
  employees: Employee[],
  page: Page
}

const initialState: EmployeesState = {
  employees: [],
  page: {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0
  }
};

export type ThunkResult = ThunkAction<Promise<void>, EmployeesState, undefined, AnyAction>;

// Reducer
export const employeeReducer = (state: EmployeesState = initialState, action: AnyAction): EmployeesState => {
  switch (action.type) {
    case ACTION_TYPE.HIRE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [action.employee, ...state.employees],
        page: {...state.page, totalElements: state.page.totalElements + 1}
      };
    case ACTION_TYPE.UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.employee.id ? action.employee : employee
        )
      };
    case ACTION_TYPE.LOAD_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.employees,
        page: action.page
      };
    case ACTION_TYPE.FIRE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: [],
        page: {...state.page, totalElements: 0}
      };
    default:
      return state;
  }
};

// Actions
const loadEmployeesSuccess = (employees: Employee[], page: Page) : AnyAction => {
  return { type: ACTION_TYPE.LOAD_EMPLOYEES_SUCCESS, employees, page };
};

const hireEmployeeSuccess = (employee: Employee): AnyAction  => {
  return { type: ACTION_TYPE.HIRE_EMPLOYEE_SUCCESS, employee };
};

const updateEmployeeSuccess = (employee: Employee): AnyAction  => {
  return { type: ACTION_TYPE.UPDATE_EMPLOYEE_SUCCESS, employee };
};

const fireEmployeesSuccess = (): AnyAction => {
  return { type: ACTION_TYPE.FIRE_EMPLOYEES_SUCCESS };
};

interface LoadEmployeesData {
  _embedded: {
    employees: Employee[]
  },
  page: Page
}

export const loadEmployees = (page = 0, size = 20): ThunkResult => {
  return async (dispatch) => {
    const result = await axios.get<LoadEmployeesData>(`/employees?page=${page}&size=${size}&sort=name,id`);
    dispatch(loadEmployeesSuccess(
      // eslint-disable-next-line no-underscore-dangle
      result.data._embedded.employees, result.data.page));
  };
};

export const hireNewEmployee =
  (employee: Employee): ThunkResult =>
    async dispatch => {
      const result = await axios.post<Employee>(
        "/employees",
        employee,
        {
          auth: {
            username: "USER",
            password: "USER"
          }
        });
      dispatch(hireEmployeeSuccess(result.data));
    };

export const updateEmployee = (employee: Employee): ThunkResult => {
  return async (dispatch) => {
    await axios.patch("/employees", employee);
    dispatch(updateEmployeeSuccess(employee));
  };
};

export const fireEmployees = (): ThunkResult => {
  return async (dispatch) => {
    await axios.delete("/employees");
    dispatch(fireEmployeesSuccess());
  };
};
