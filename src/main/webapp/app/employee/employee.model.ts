import BigNumber from "bignumber.js"

export interface Salary {
  value: BigNumber
}

export interface Employee {
  id: string;
  name: string;
  salary: Salary;
}

export interface Page {
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
