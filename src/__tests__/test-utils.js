import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import initStore from '../store';
import * as sagaUtils from '../store/sagas';

export const store = initStore();

sagaUtils.run(sagaUtils.sagas);

export const randomItem = collection =>
  collection[Math.floor(Math.random() * collection.length)];

/**
 * Wrap components in BrowserRouter component
 * to allow them access to capabilities offered by react-router-dom
 */
export const wrapComponentInRouter = Component => {
  const InternalComponent = (props) => (
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  );

  return InternalComponent;
};

export const bindComponentToStore = (store) => (Component) => {
  const ConnectedComponent = (props) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );

  return ConnectedComponent;
};
