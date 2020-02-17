import React from "react";
import ReactDOM  from "react-dom";
import { Provider } from "react-redux";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import {initializeStore} from "./config/store";
import {ErrorBoundary} from './error-boundary';
import {registerInterceptors} from "./api/axios";
import { DevTools } from './config/devtools';
import './config/i18n';
import {App, Application} from "./app";
import { theme } from './theme';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initializeStore();
registerInterceptors(store);

const rootEl = document.querySelector('#app');

const render = (AppComponent: Application): void => {
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {devTools}
          <AppComponent/>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>,
    rootEl
  );
};

render(App);
