import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Theme, createStyles, WithStyles, StyleRules, withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {AppBar, Button, TableHead, TextField, Typography} from "@material-ui/core";

import {
  fireEmployees as fireEmployeesAction,
  hireNewEmployee as hireNewEmployeeAction,
  loadEmployees as loadEmployeesAction
} from "./employee";
import {RootState} from "../root-reducer";

const styles = ({ palette, spacing}: Theme) : StyleRules => createStyles({
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: spacing(1),
  },
  paper: { /* ... */ },
  button: { /* ... */ },
});

interface ManageEmployeesProps extends StateProps, DispatchProps, WithStyles<typeof styles> {}

const Page = (
  { employees,
    classes,
    loadEmployees,
    fireEmployees,
    hireNewEmployee
  }: ManageEmployeesProps) : JSX.Element => {
  useEffect(() => {
    loadEmployees();
  }, []);
  const { t } = useTranslation(undefined, { useSuspense: false });
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            {t("Employees")}
          </Typography>
          <Button>
            <AddIcon/>
          </Button>
          <Button>
            <DeleteIcon/>
          </Button>
        </Toolbar>
      </AppBar>
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
                <TableCell>
                  {employee.name}
                </TableCell>
                <TableCell align="right">
                  <TextField
                    variant="outlined"
                    type="number"
                    value={employee.salary.value}/>
                </TableCell>
                <TableCell size="small">
                  <Button>
                    <SaveIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

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

export const ManageEmployeesPage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page));
