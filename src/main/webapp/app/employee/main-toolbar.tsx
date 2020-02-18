import React, {useState} from "react";
import {connect} from "react-redux";
import {createStyles, StyleRules, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import Toolbar from "@material-ui/core/Toolbar";
import {Button, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { fireEmployees as fireEmployeesAction } from "./employee";
import {RootState} from "../root-reducer";
import { DeleteAlert } from './delete-alert';
import {AddEmployeeDialog} from "./add-employee-dialog";

const styles = ({ spacing, palette}: Theme) : StyleRules => createStyles({
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: spacing(1),
  },
  toolbarIcon: {
    color: palette.background.default
  },
  toolbar: {
    paddingLeft: spacing(1),
    paddingRight: spacing(0)
  }
});

interface MainToolbarProps extends DispatchProps, StateProps, WithStyles<typeof styles> {}

const toolbar = ({
                   classes,
                   employeesExist,
                   fireEmployees
                 }: MainToolbarProps) : JSX.Element => {
  const { t } = useTranslation(undefined, { useSuspense: true });
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);
  return (
    <Toolbar className={classes.toolbar}>
      <Typography variant="h3" className={classes.title}>
        {t("Employees")}
      </Typography>
      <Button
        className={classes.margin}
        disabled={!employeesExist}
        onClick={() => setDeleteAlertOpen(true)}>
        <DeleteIcon className={classes.toolbarIcon}/>
      </Button>
      <Button
        onClick={() => setAddEmployeeDialogOpen(true)}>
        <AddIcon className={classes.toolbarIcon}/>
      </Button>
      <DeleteAlert
        open={deleteAlertOpen}
        onCancel={() => setDeleteAlertOpen(false)}
        onConfirm={() => {
          setDeleteAlertOpen(false);
          fireEmployees();
        }}
      />
      <AddEmployeeDialog
        open={addEmployeeDialogOpen}
        onClose={() => setAddEmployeeDialogOpen(false)}
      />
    </Toolbar>
  );
};

const mapDispatchToProps = {
  fireEmployees: fireEmployeesAction
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({employee}: RootState) => ({
  employeesExist: employee.employees.length > 0
});

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export const MainToolbar = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(toolbar));
