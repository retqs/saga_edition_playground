import ... from 'redux-saga/effects' all 'effects' are being exported like that


--fork-- is ofter used with --cancel,cancelled-- since it's none blocking call,therefore we can cancel it any time when exact
action comes up
while(true) {} loop is goto for --take-- (see authFlow example) it'll trigger proper workers according to current action
rootSaga.(ts,js,jsx)
  yield all([
    fork(watchAndLog),
    fork(watchFetchData, {name: 'payload at root saga'}),
    fork(watchSearchFetch),
    fork(socketRootSaga),
    fork(watchSortData),
    fork(watchAuthFlow),
  ]);

the same things goes for parallel stuff
