import axios, { AxiosError } from "axios";
import { Store } from 'redux';
import {apiCallError, beginApiCall, endApiCall} from "./api";
import {config} from "../config/constants";

const TIMEOUT = 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = config.SERVER_API_URL;

export const registerInterceptors = (store: Store): void => {

  const onRejected = (error: AxiosError): Promise<AxiosError> => {
      store.dispatch(apiCallError(error));
      setTimeout(() => {
        store.dispatch(apiCallError());
      }, 6000);
      return Promise.reject(error);
  };

  axios.interceptors.request.use(conf => {
        // spinning start to show
        store.dispatch(beginApiCall());
        return conf;
    }, onRejected);

    axios.interceptors.response.use(response => {
        store.dispatch(endApiCall());
        return response;
    }, onRejected);
};
