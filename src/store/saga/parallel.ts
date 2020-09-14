import {all, call, delay, fork, put} from 'redux-saga/effects';

import {actionTypes} from '../actions/actionTypes';

async function getData(): Promise<any[]> {
  return await fetch('https://jsonplaceholder.typicode.com/posts').then((d) => d.json());
}

function* fetchResource(d: string) {
  const data = yield call(getData);
  yield put({type: 'kek', payload: data});
}

function* fetchAll() {
  // the same as result below it
  yield all([fork(fetchResource, 'one'), fork(fetchResource, 'two'), delay(5000)]);

  // NOTES: raises an uncaught error, the parallel Effect will cancel the 2 other tasks
  // to prevent use trycatch in watch saga

  //   try {
  //     const task1 = yield fork(fetchResource, 'one');
  //     const task2 = yield fork(fetchResource, 'two');

  //     yield delay(1000);
  //   } catch (error) {
  //     console.log(error);
  //   }
}

export function* watchFetchAll() {
  try {
    yield call(fetchAll);
  } catch (error) {
    console.log(error);
  }
}
