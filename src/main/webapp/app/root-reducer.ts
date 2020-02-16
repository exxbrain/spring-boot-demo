import { combineReducers } from "redux";
import {apiReducer, ApiState} from "./api/api";
import {employeeReducer, EmployeesState} from "./employee/employee";

export interface RootState {
  employee: EmployeesState,
  api: ApiState
}

export const rootReducer = combineReducers({
  employee: employeeReducer,
  api: apiReducer
});
