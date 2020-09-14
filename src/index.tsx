import 'rsuite/dist/styles/rsuite-default.css';

import * as serviceWorker from './serviceWorker';

import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {persistor} from './store';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
