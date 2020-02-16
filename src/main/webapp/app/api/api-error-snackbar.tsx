import React, { useEffect } from "react";
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import {RootState} from "../root-reducer";

const Alert = ({severity, children}: AlertProps): JSX.Element => {
  return <MuiAlert elevation={6} variant="filled" severity={severity}>{children}</MuiAlert>;
};

const apiErrorSnackbar = ((
  { hasError, errorMessage}: StateProps)
  : JSX.Element => {
  const { t } = useTranslation(undefined, { useSuspense: false });
  return (
    <Snackbar open={hasError}>
      <Alert severity="error">
        {errorMessage && t(errorMessage)}
      </Alert>
    </Snackbar>
  );
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ({api}: RootState) => ({
  errorMessage: api.error?.message,
  hasError: Boolean(api.error)
});

type StateProps = ReturnType<typeof mapStateToProps>;

export const ApiErrorSnackbar = connect(mapStateToProps)(apiErrorSnackbar);
