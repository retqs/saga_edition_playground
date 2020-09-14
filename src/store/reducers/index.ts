// dunno where I should add RootReducerProps

import {RootReducerProps} from '../../schemas/storeTypes';
import {combineReducers} from 'redux';
import fetchReducer from './fetchReducer';
import {persistReducer} from 'redux-persist';
import searchReducer from './searchReducer';
import sessionStorage from 'redux-persist/lib/storage/session'; // sessionStorage
import sortReducer from './sortReducer';
import storage from 'redux-persist/lib/storage'; // localStorage
import toggleReducer from './toggleReducer';

interface ConfigProps {
  key: string;
  storage: typeof storage;
  whitelist: Array<string>;
}

const persistConfig: ConfigProps = {
  key: 'root',
  storage,
  whitelist: ['searchReducer'], // list of reducers that we want to store
};

// notable other config: whitelist, blacklist, version, stateReconciler, debug

const rootReducer = combineReducers({
  fetchReducer,
  searchReducer,
  toggleReducer,
  sortReducer,
});

export default persistReducer(persistConfig, rootReducer);
