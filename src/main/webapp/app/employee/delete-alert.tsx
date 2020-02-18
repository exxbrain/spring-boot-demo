import {useTranslation} from "react-i18next";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React from "react";

interface DeleteAlertProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteAlert = ({open, onCancel, onConfirm}: DeleteAlertProps): JSX.Element => {
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
        <Button onClick={onConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
