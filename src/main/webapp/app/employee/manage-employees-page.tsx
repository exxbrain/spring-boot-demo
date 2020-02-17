import React, { Suspense } from "react";
import clsx from "clsx"
import {AppBar, Container, Grid, withStyles} from "@material-ui/core";
import {LoadingBar} from "react-redux-loading-bar";
import {createStyles, StyleRules, Theme, WithStyles} from "@material-ui/core/styles";
import {MainToolbar} from "./main-toolbar";
import {EmployeesTable} from "./employees-table";

const styles = ({mixins, spacing}: Theme) : StyleRules => createStyles({
  offset: mixins.toolbar,
  width: {
    maxWidth: 700
  },
  margin: {
    margin: spacing(2)
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
      <div className={classes.offset} />
      <Grid container justify="center">
        <Container className={clsx(classes.width, classes.margin)}>
          <EmployeesTable/>
        </Container>
      </Grid>
    </Suspense>
  );
};

export const ManageEmployeesPage = withStyles(styles)(page)
