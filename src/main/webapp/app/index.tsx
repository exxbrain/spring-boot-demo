import React from "react";
import ReactDOM  from "react-dom";
import { Provider } from "react-redux";
import "../index.css";
import {initializeStore} from "./config/store";
import {ErrorBoundary} from './error-boundary';
import {registerInterceptors} from "./api/axios";
import { DevTools } from './config/devtools';
import './config/i18n';
import {App, Application} from "./app";

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initializeStore();
registerInterceptors(store);

const rootEl = document.querySelector('#app');

const render = (Component: Application): void => {
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <div>
          {devTools}
          <Component/>
        </div>
      </Provider>
    </ErrorBoundary>,
    rootEl
  );
};

render(App);
