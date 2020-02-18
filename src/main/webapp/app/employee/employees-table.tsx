import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { createStyles, WithStyles, StyleRules, withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {Button, TableHead, TextField, TablePagination} from "@material-ui/core";

import {
  loadEmployees as loadEmployeesAction
} from "./employee";
import {RootState} from "../root-reducer";
import {Employee} from "./employee.model";

const styles = () : StyleRules => createStyles({
  paper: { /* ... */ },
  button: { /* ... */ },
});

type Props = StateProps & DispatchProps & WithStyles<typeof styles>

const EmployeeRow = (employee: Employee): JSX.Element => (
  <TableRow key={employee.id}>
    <TableCell component="th" scope="row">
      {employee.name}
    </TableCell>
    <TableCell align="right">
      <TextField
        type="number"
        value={employee.salary.value}/>
    </TableCell>
    <TableCell padding="checkbox">
      <Button hidden>
        <SaveIcon/>
      </Button>
    </TableCell>
  </TableRow>
);

const table = (
  { employees,
    pageObject,
    classes,
    loadEmployees,
  }: Props) : JSX.Element => {

  useEffect(() => {loadEmployees();}, []);
  const { t } = useTranslation(undefined, { useSuspense: true });

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number): void => {
    loadEmployees(page)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    loadEmployees(0, +event.target.value);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} >
          <TableHead>
            <TableRow>
              <TableCell className={classes.title}>{t("Name")}</TableCell>
              <TableCell align="right">{t("Salary")}</TableCell>
              <TableCell size="small"/>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(employee => (
              EmployeeRow(employee)
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component="div"
        count={pageObject.totalElements}
        rowsPerPage={pageObject.size}
        page={pageObject.number}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

const mapDispatchToProps = {
  loadEmployees: loadEmployeesAction
};


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({employee}: RootState) => ({
  employees: employee.employees,
  pageObject: employee.page
});

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export const EmployeesTable = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(table));
