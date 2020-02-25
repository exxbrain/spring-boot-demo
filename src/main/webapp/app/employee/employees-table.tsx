import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {createStyles, WithStyles, StyleRules, withStyles} from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {TableHead, TablePagination, IconButton} from "@material-ui/core";

import BigNumber from "bignumber.js";
import {
  loadEmployees as loadEmployeesAction,
  updateEmployee as updateEmployeeAction
} from "./employee";
import {RootState} from "../root-reducer";
import {Employee} from "./employee.model";
import {CurrencyField } from "../common/currency-field";

const styles = () : StyleRules => createStyles({
  buttonCell: {
    width: 60
  },
  tableHead: {
    fontWeight: "bold"
  },
  container: {
    height: "100%",
  }
});

type Props = StateProps & DispatchProps & WithStyles<typeof styles>

const table = (
  { employees,
    pageObject,
    classes,
    loadEmployees,
    isEmpty,
    updateEmployee
  }: Props) : JSX.Element => {

  useEffect(() => {loadEmployees();}, []);
  const[updatedEmployees, setUpdatedEmployees] = useState(new Map<string, Employee>());

  const { t } = useTranslation(undefined, { useSuspense: true });

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number): void => {
    loadEmployees(page)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    loadEmployees(0, +event.target.value);
  };

  const handleSalaryChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = new BigNumber(event.target.value);
    if (!value) {
      return;
    }
    const index = /.*\[(\d*)]$/.exec(event.target.name);
    if (index != null) {
      const employee = employees[+index[1]];
      if (value.eq(employee.salary.value)) {
        updatedEmployees.delete(employee.id);
      } else {
        const updatedEmployee: Employee = {
          ...employee,
          salary: {
            ...employee.salary,
            value
          }
        };
        updatedEmployees.set(updatedEmployee.id, updatedEmployee);
      }
      setUpdatedEmployees(new Map(updatedEmployees));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveEmployee = async (employee: Employee): Promise<any> => {
    await updateEmployee(employee);
    updatedEmployees.delete(employee.id);
    setUpdatedEmployees(new Map(updatedEmployees));
  };

  return (
    <>
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>{t("Name")}</TableCell>
                <TableCell className={classes.tableHead} align="right">{t("Salary")}</TableCell>
                <TableCell className={classes.buttonCell}/>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                employees.map((employee, index) => {
                  const updatedEmployee = updatedEmployees.get(employee.id);
                  return (
                    <TableRow key={employee.id}>
                      <TableCell>
                        {employee.name}
                      </TableCell>
                      <TableCell align="right">
                        <CurrencyField
                          size="small"
                          name={`salaries[${index}]`}
                          variant="outlined"
                          value={updatedEmployee?.salary?.value || employee.salary.value}
                          onChange={handleSalaryChanged}
                          required
                        />
                      </TableCell>
                      <TableCell padding="checkbox">
                        { updatedEmployee && <IconButton onClick={() => saveEmployee(updatedEmployee)}>
                          <SaveIcon/>
                        </IconButton> }
                      </TableCell>
                    </TableRow>
                  )
                })
              }
              {
                isEmpty && <TableRow>
                  <TableCell>
                    {t("No employees found!")}
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
        {
          !isEmpty && <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            labelRowsPerPage={t("Rows per page")}

            component="div"
            count={pageObject.totalElements}
            rowsPerPage={pageObject.size}
            page={pageObject.number}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}/>
        }
    </>
  );
};

const mapDispatchToProps = {
  loadEmployees: loadEmployeesAction,
  updateEmployee: updateEmployeeAction
};


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({employee}: RootState) => ({
  employees: employee.employees,
  pageObject: employee.page,
  isEmpty: employee.employees.length === 0
});

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export const EmployeesTable = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(table));
