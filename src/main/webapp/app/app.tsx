import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {PageNotFound} from "./page-not-found";
import {ManageEmployeesPage} from "./employee/manage-employees-page";
import {ErrorBoundary} from "./error-boundary";
import {ApiErrorSnackbar} from "./api/api-error-snackbar";

export const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <ErrorBoundary>
            <Route exact path="/" component={ManageEmployeesPage} />
          </ErrorBoundary>
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
      <ApiErrorSnackbar/>
    </>
  );
};

export type Application = typeof App;
