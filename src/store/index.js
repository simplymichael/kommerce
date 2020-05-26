import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import sagaRegistry from './saga-registry';
import reducerRegistry from './reducer-registry';
import { combineReducers } from 'redux-immutable';

export default function initStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers(reducerRegistry.getReducers()),
    fromJS(initialState),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  store.injectedSagas = {};

  // Replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combineReducers(reducers));
  });

  sagaRegistry.setChangeListener(sagas => {
    for(let [key, saga] of Object.entries(sagas)) {
      let descriptor = store.injectedSagas[key];

      if(!descriptor || !descriptor.task.isRunning()) {
        store.injectedSagas[key] = {
          task: sagaMiddleware.run(saga),
        };
      }
    }
  });

  return store;
}
