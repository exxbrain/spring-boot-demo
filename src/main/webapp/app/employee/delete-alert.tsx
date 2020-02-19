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
      <DialogTitle id="alert-dialog-title">{t("Are you sure you want to remove all employees?")}</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>
          {t("Do not remove")}
        </Button>
        <Button onClick={onConfirm} autoFocus>
          {t("Remove")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
