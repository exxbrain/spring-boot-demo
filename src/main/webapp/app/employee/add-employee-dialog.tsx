import {useTranslation} from "react-i18next";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React from "react";
import BigNumber from 'bignumber.js';
import {Employee} from './employee.model';

interface AddEmployeeDialogProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: (employee: Employee) => void;
}

export const AddEmployeeDialog = ({open, onCancel, onSuccess}: AddEmployeeDialogProps): JSX.Element => {
  const { t } = useTranslation(undefined, { useSuspense: true });
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Use Google&lsquo;s location service?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Disagree
        </Button>
        <Button onClick={() => onSuccess({ name: "Антошка", salary: { value: new BigNumber(60) }}) } autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
