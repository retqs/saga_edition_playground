import * as ioClient from 'socket.io-client';

import {all, call, cancel, fork, put, take} from 'redux-saga/effects';

import {actionTypes} from '../actions/actionTypes';
import {eventChannel} from 'redux-saga';

function connect() {
  const socket = ioClient.connect('http://localhost:1488/');

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
    socket.on('currencyChange', (message: any) => {
      console.log(message, 'message subcribe method socket.on(currency)');
      // -------------------some action instead of clg f!K!J:L!KJ:L!KJ@:LK!J@:!K@J@
      emit(() => console.log('emitted'));
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

function* handleIO(socket: any) {
  yield fork(read, socket);
}

function* flow() {
  while (true) {
    yield take(actionTypes.AUTH_ERROR);
    const {socket, error} = yield call(connect);

    if (socket) {
      console.log('connected to socket flow fn at socketSaga');
      const ioTask = yield fork(handleIO, socket);
      yield take(actionTypes.STOP_SOCKET_SUBSCRIPTION);
      yield cancel(ioTask);
      socket.disconnect();
    } else {
      console.log('error while connecting');
    }
  }
}

export function* socketRootSaga() {
  yield all([fork(flow)]);
}
