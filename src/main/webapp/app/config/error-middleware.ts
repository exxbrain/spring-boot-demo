import { Dispatch, AnyAction } from 'redux';
import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPromise = (obj: any): boolean =>
  !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';

export const errorMiddleware = () => {
  return (next: Dispatch) => {
    return (action: AnyAction) => {
      // If not a promise, continue on
      if (!isPromise(action.payload)) {
        return next(action);
      }

      /**
       *
       * The error middleware serves to dispatch the initial pending promise to
       * the promise middleware, but adds a `catch`.
       * It need not run in production
       */
      if (process.env.NODE_ENV === 'development') {
        // Dispatch initial pending promise, but catch any errors
        return next(action).catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
          const axiosError = error as AxiosError;
          if (axiosError && axiosError.response && axiosError.response.data) {
            const {message} = axiosError.response.data;
            // eslint-disable-next-line no-console
            console.error(`Actual cause: ${message}`);
          }
          throw error;
        });
      }
      return next(action);
    };
  };
};
