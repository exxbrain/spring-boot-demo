import React, { Suspense } from "react";
import clsx from "clsx"
import {AppBar, Container, Grid, withStyles} from "@material-ui/core";
import {LoadingBar} from "react-redux-loading-bar";
import {createStyles, StyleRules, Theme, WithStyles} from "@material-ui/core/styles";
import {MainToolbar} from "./main-toolbar";
import {EmployeesTable} from "./employees-table";

const styles = ({mixins}: Theme) : StyleRules => createStyles({
  offset: {
    height: mixins.toolbar.minHeight as number + 15
  }
});

const page = ({classes}: WithStyles<typeof styles>) : JSX.Element => {
  return (
    <Suspense fallback={<LoadingBar/>}>
      <AppBar>
        <Grid container justify="center">
          <Container maxWidth='sm'>
            <MainToolbar/>
          </Container>
        </Grid>
      </AppBar>
      <div className={classes.offset}/>
      <Grid container justify="center">
        <Container maxWidth='sm'>
          <EmployeesTable/>
        </Container>
      </Grid>
      <div className={classes.offset}/>
    </Suspense>
  );
};

export const ManageEmployeesPage = withStyles(styles)(page)
