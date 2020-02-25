import React, { Suspense } from "react";
import clsx from "clsx"
import {AppBar, Container, Grid, withStyles} from "@material-ui/core";
import {LoadingBar} from "react-redux-loading-bar";
import {createStyles, StyleRules, Theme, WithStyles} from "@material-ui/core/styles";
import {MainToolbar} from "./main-toolbar";
import {EmployeesTable} from "./employees-table";

const styles = ({mixins}: Theme) : StyleRules => createStyles({
  width: {
    maxWidth: 700
  },
  grid: {
    height: "100vh",
    paddingTop: mixins.toolbar.minHeight as number + 20,
    paddingBottom: mixins.toolbar.minHeight
  }
});

const page = ({classes}: WithStyles<typeof styles>) : JSX.Element => {
  return (
    <Suspense fallback={<LoadingBar/>}>
      <AppBar>
        <Grid container justify="center">
          <Container className={classes.width}>
            <MainToolbar/>
          </Container>
        </Grid>
      </AppBar>
      <Grid container justify="center">
        <Container className={clsx([classes.grid, classes.width])}>
          <EmployeesTable/>
        </Container>
      </Grid>
    </Suspense>
  );
};

export const ManageEmployeesPage = withStyles(styles)(page)
