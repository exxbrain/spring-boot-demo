import { Dispatch, AnyAction } from 'redux';

export const loggerMiddleware = () => {
  return (next: Dispatch) => {
    return (action: AnyAction) => {
      if (process.env.NODE_ENV !== 'production') {
        const {type, payload, meta} = action;

        // eslint-disable-next-line no-console
        console.groupCollapsed(type);
        // eslint-disable-next-line no-console
        console.log('Payload:', payload);
        // eslint-disable-next-line no-console
        console.log('Meta:', meta);
        // eslint-disable-next-line no-console
        console.groupEnd();
      }

      return next(action);
    };
  };
};
