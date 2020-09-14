import {applyMiddleware, compose, createStore} from 'redux';

import createSagaMiddleware from 'redux-saga';
import {forbiddenWordsMiddleware} from './middleware';
import {persistStore} from 'redux-persist';
import rootReducer from './reducers';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middlewares = [sagaMiddleware, forbiddenWordsMiddleware];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), reduxDevTools)
);

export default store;

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
