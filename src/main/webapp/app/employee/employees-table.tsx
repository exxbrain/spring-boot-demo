import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Theme, createStyles, WithStyles, StyleRules, withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {Button, TableHead, TextField} from "@material-ui/core";

import {
  loadEmployees as loadEmployeesAction
} from "./employee";
import {RootState} from "../root-reducer";

const styles = ({ palette, spacing}: Theme) : StyleRules => createStyles({
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface ManageEmployeesProps extends StateProps, DispatchProps, WithStyles<typeof styles> {}
const table = (
  { employees,
    classes,
    loadEmployees,
  }: ManageEmployeesProps) : JSX.Element => {

  useEffect(() => {loadEmployees();}, []);
  const { t } = useTranslation(undefined, { useSuspense: true });
  return (
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
                <Button>
                  <SaveIcon/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapDispatchToProps = {
  loadEmployees: loadEmployeesAction
};


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({employee}: RootState) => ({
  employees: employee.employees
});

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export const EmployeesTable = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(table));
