import { applyMiddleware, compose, createStore, Middleware, StoreEnhancer, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import {rootReducer, RootState} from "../root-reducer";
import {loggerMiddleware} from './logger-middleware';
import {errorMiddleware} from './error-middleware';
import {DevTools} from './devtools';

const defaultMiddlewares = [
  thunkMiddleware,
  loggerMiddleware,
  errorMiddleware
];

const composedMiddlewares = (middlewares: Middleware[]): StoreEnhancer =>
    process.env.NODE_ENV === 'development'
        ? compose(applyMiddleware(...defaultMiddlewares, ...middlewares), DevTools.instrument())
        : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

export const initializeStore = (initialState?: RootState, middlewares = []): Store =>
    createStore(rootReducer, initialState, composedMiddlewares(middlewares));
