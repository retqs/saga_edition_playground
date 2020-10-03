import {
  all,
  call,
  cancel,
  fork,
  join,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';

import {RootReducerProps} from '../../schemas/storeTypes';
import {actionTypes} from '../actions/actionTypes';
import axios from 'axios';
import {eventChannel} from 'redux-saga';
import ioClient from 'socket.io-client';

function* workerOne({payload}) {
  console.log(payload, 'the same goes about payload');
  const state = yield select((state: RootReducerProps) => state.fetchReducer);
  console.log('state inside of workerOne', state);
}

function connect() {
  const socket = ioClient.connect('http://localhost:2000/');

  return new Promise((res, rej) => {
    socket.on('connect', () => {
      socket.emit('currencyChange');
      res({socket});
    });
    socket.on('connect_error', () => {
      rej(new Error('ws:connect_failed'));
    });
  }).catch((error) => ({socket, error}));
}

function subscribe(socket: any) {
  return eventChannel((emit) => {
    socket.on('currencyChange', (change: any) => {
      console.log('currency changed - payload: -->', change);
      emit({type: actionTypes.SET_CURRENCY, payload: change});
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    return () => {};
  });
}

function* read(socket: any) {
  const channel = yield call(subscribe, socket);

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* handleIo(socket: any) {
  yield fork(read, socket);
}

function* socketFlow() {
  while (true) {
    yield take(actionTypes.START_SOCKET_SUBSCRIPTION);
    const {socket, error} = yield call(connect);

    if (socket) {
      const ioTask = yield fork(handleIo, socket);
      yield take(actionTypes.STOP_SOCKET_SUBSCRIPTION);
      yield cancel(ioTask);
      socket.disconnect();
    }
  }
}

export function* watchAllSaga() {
  // args after worker one removes payload
  // @ts-ignore
  yield takeEvery(actionTypes.REQUEST_ONE, workerOne);
}

export function* watchSocketFlow() {
  yield all([fork(socketFlow)]);
}

//   yield fork(workerOne);
// // to prevent spam
// yield takeLatest(actionTypes.REQUEST_TWO, workerTwo, 'kek');
// //   yield fork(workerTwo);

// yield takeLeading(actionTypes.REQUEST_THREE, workerThree);
// //   yield fork(workerThree);
