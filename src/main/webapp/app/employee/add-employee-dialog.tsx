import {useTranslation} from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField, withStyles
} from "@material-ui/core";
import React from "react";
import BigNumber from 'bignumber.js';
import {Formik} from "formik";
import {connect} from "react-redux";
import {createStyles, StyleRules, Theme, WithStyles} from "@material-ui/core/styles";
import {Employee} from './employee.model';
import { hireNewEmployee as hireNewEmployeeAction } from "./employee";

const styles = ({ spacing}: Theme) : StyleRules => createStyles({
  margin: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  }
});

interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
}

type Props = AddEmployeeDialogProps & DispatchProps & WithStyles<typeof styles>;

const dialog = ({open, onClose, hireNewEmployee, classes}: Props): JSX.Element => {
  const { t } = useTranslation(undefined, { useSuspense: true });
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t("New employee!")}</DialogTitle>
      <Formik
        initialValues={{ name: '', salary: '' }}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors = {...errors, name: t('Required')};
          }
          if (!values.salary) {
            errors = {...errors, salary: t('Required')};
          }
          return errors;
        }}
        onSubmit={ async (values, { setSubmitting }) => {
          await hireNewEmployee(values.name, new BigNumber(values.salary));
          setSubmitting(false);
          onClose();
        }}
      >
        {({ values,
            errors,
            isSubmitting,
            handleSubmit,
            handleChange,
            handleBlur
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                className={classes.margin}
                fullWidth
                label={t("Name")}
                name="name"
                variant="outlined"
                error={Boolean(errors.name)}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}/>
              <TextField
                className={classes.margin}
                fullWidth
                label={t("Salary")}
                name="salary"
                type="Number"
                variant="outlined"
                error={Boolean(errors.salary)}
                value={values.salary}
                onChange={handleChange}
                onBlur={handleBlur}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                {t("Cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                autoFocus>
                {t("Save")}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

const mapDispatchToProps = {
  hireNewEmployee: hireNewEmployeeAction
};

type DispatchProps = typeof mapDispatchToProps;

export const AddEmployeeDialog = connect(null, mapDispatchToProps)(withStyles(styles)(dialog));
