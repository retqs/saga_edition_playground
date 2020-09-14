import * as ioClient from 'socket.io-client';

import {all, call, cancel, fork, put, take} from 'redux-saga/effects';

import {actionTypes} from '../actions/actionTypes';
import {eventChannel} from 'redux-saga';

function connect() {
  const socket = ioClient.connect('http://localhost:1488/');

  return new Promise((res, rej) => {
    socket.on('connect', () => {
      socket.emit('messages');
      res({socket});
    });

    socket.on('connect_error', () => {
      console.log('something went wront /saga/socketSaga.ts');
      rej(new Error('ws:connect_failed'));
    });
  }).catch((error) => ({socket, error}));
}

function subscribe(socket) {
  return eventChannel((emit) => {
    socket.on('messages', (message: any) => {
      console.log(message, 'message subcribe method socket.on(currency)');
      // some action instead of clg
      emit(() => console.log('emitted'));
    });

    socket.on('disconnect', (e) => {
      console.log('disconnected');
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* flow() {
  while (true) {
    yield take(actionTypes.START_SOCKET_SUBSCRIPTION);
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

function* handleIO(socket: any) {
  yield fork(read, socket);
}

export function* socketRootSaga() {
  yield all([fork(flow)]);
}
