import {useTranslation} from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, TextField,
  withStyles,
  IconButton
} from "@material-ui/core";
import React from "react";
import {connect} from "react-redux";
import {createStyles, StyleRules, Theme, WithStyles} from "@material-ui/core/styles";
import BigNumber from 'bignumber.js';
import { Close as CloseIcon } from "@material-ui/icons"
import {Formik, Form} from "formik";
import { hireNewEmployee as hireNewEmployeeAction } from "./employee";
import { CurrencyField } from "../common/currency-field";

const styles = ({ spacing, palette}: Theme) : StyleRules => createStyles({
  margin: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: spacing(1),
    top: spacing(1),
    color: palette.grey[500],
  },
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
      <DialogTitle id="alert-dialog-title">
        {t("New employee!")}
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={{name: '', salary: ''}}
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
            touched,
            isSubmitting,
            handleChange,
            handleBlur
          }) => (
          <Form>
            <DialogContent>
              <TextField
                className={classes.margin}
                fullWidth
                required
                error={touched.name && Boolean(errors.name)}
                helperText={touched.salary && errors.name}
                value={values.name}
                onBlur={handleBlur}
                name="name"
                label={t("Name")}
                onChange={handleChange}
                variant="outlined"/>
              <CurrencyField
                className={classes.margin}
                fullWidth
                label={t("Salary")}
                variant="outlined"
                required
                name="salary"
                error={touched.salary && Boolean(errors.salary)}
                helperText={touched.salary && errors.salary}
                value={values.salary}
                onChange={handleChange}
                onBlur={handleBlur}/>
            </DialogContent>
            <DialogActions>
              <Button disabled={isSubmitting}
                type="submit"
                autoFocus>
                {t("Save")}
              </Button>
            </DialogActions>
          </Form>
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
