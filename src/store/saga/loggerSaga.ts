import {select, take} from 'redux-saga/effects';

export function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const state = yield select();

    console.log('logger action-->', action);
    // console.log('select-->', state);
  }
}
