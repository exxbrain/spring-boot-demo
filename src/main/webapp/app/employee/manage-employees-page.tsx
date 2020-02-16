import React, { useEffect } from "react";
import { connect } from 'react-redux';
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Theme, createStyles, WithStyles, StyleRules, withStyles } from '@material-ui/core/styles';

import {
  fireEmployees as fireEmployeesAction,
  hireNewEmployee as hireNewEmployeeAction,
  loadEmployees as loadEmployeesAction
} from "./employee";
import {RootState} from "../root-reducer";

const styles = ({ palette}: Theme) : StyleRules => createStyles({
  root: {
    width: "100%",
    maxWidth: 700,
    height: "100%",
    backgroundColor: palette.background.paper,
    position: "relative",
    overflow: "auto"
  },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface ManageEmployeesProps extends StateProps, DispatchProps, WithStyles<typeof styles> {}

const Page = withStyles(styles)((
  { employees,
    classes,
    loadEmployees,
    fireEmployees,
    hireNewEmployee
  }: ManageEmployeesProps) : JSX.Element => {
  useEffect(() => {
    loadEmployees();
  }, []);
  return (
    <Paper className={classes.paper}>
      <Toolbar/>
      <TableContainer>
        <Table>
          <TableBody>
            {employees.map(employee => (
              <TableRow key={employee.id}>
                <TableCell>
                  {employee.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});

const mapDispatchToProps = {
  fireEmployees: fireEmployeesAction,
  loadEmployees: loadEmployeesAction,
  hireNewEmployee: hireNewEmployeeAction
};


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({employee}: RootState) => ({
  employees: employee.employees
});

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export const ManageEmployeesPage = connect(mapStateToProps, mapDispatchToProps)(Page);
