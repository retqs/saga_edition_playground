import {all, fork} from 'redux-saga/effects';
import {watchAllSaga, watchSocketFlow} from './statsSaga';

import {socketRootSaga} from './socketSaga';
import {watchAndLog} from './loggerSaga';
import {watchAuthFlow} from './authSaga';
import {watchFetchData} from './fetchData';
import {watchSearchFetch} from './querySaga';
import {watchSortData} from './sortSaga';
import {watchUndo} from './undoSaga';

export default function* rootSaga() {
  // and just separate them all one by one with commas

  yield all([
    fork(watchAndLog),
    fork(watchFetchData, {name: 'payload at root saga'}),
    fork(watchSearchFetch),
    fork(socketRootSaga),
    fork(watchSortData),
    fork(watchAuthFlow),
    fork(watchUndo),
    fork(watchAllSaga),
    fork(watchSocketFlow)
  ]);
}
