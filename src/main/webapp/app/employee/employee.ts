import axios from "axios";
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import BigNumber from 'bignumber.js';
import { Employee } from "./employee.model";

// Action types
export const ACTION_TYPE = {
  FIRE_EMPLOYEES_SUCCESS: "employees/FIRE_EMPLOYEES_SUCCESS",
  UPDATE_EMPLOYEE_SUCCESS: "employees/UPDATE_EMPLOYEE_SUCCESS",
  HIRE_EMPLOYEE_SUCCESS: "employees/HIRE_EMPLOYEE_SUCCESS",
  LOAD_EMPLOYEES_SUCCESS: "employees/LOAD_EMPLOYEES_SUCCESS"
};

export interface EmployeesState {
    employees: Employee[]
}

const initialState: EmployeesState = {
    employees: []
};

export type ThunkResult = ThunkAction<Promise<void>, EmployeesState, undefined, AnyAction>;

// Reducer
export const employeeReducer = (state: EmployeesState = initialState, action: AnyAction): EmployeesState => {
  switch (action.type) {
    case ACTION_TYPE.HIRE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.employee]
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
        employees: action.employees
      };
    case ACTION_TYPE.FIRE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: []
      };
    default:
      return state;
  }
};

// Actions
const loadEmployeesSuccess = (employees: Employee[]) : AnyAction => {
  return { type: ACTION_TYPE.LOAD_EMPLOYEES_SUCCESS, employees };
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
  _embedded?: {
    employeeModelList?: Employee[]
  }
}

export const loadEmployees = (): ThunkResult => {
  return async (dispatch) => {
    const result = await axios.get<LoadEmployeesData>("/employees");
    dispatch(loadEmployeesSuccess(
      result.data?._embedded?.employeeModelList ?? []));
  };
};

export const hireNewEmployee =
    (name: string, salaryValue: BigNumber): ThunkResult =>
    async dispatch => {
        const result = await axios.post<Employee>(
            "/employees",
            { name, salaryValue },
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
