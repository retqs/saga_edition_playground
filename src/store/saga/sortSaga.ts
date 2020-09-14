import {call, cancel, cancelled, fork, put, take, takeLatest} from 'redux-saga/effects';

import {actionTypes} from '../actions/actionTypes';

// users?userId=2 params to sort

async function getData(): Promise<any[]> {
  return await fetch('https://jsonplaceholder.typicode.com/users').then((d) => d.json());
}

function* fetchSortData() {
  try {
    const data: any[] = yield call(getData);

    yield put({type: actionTypes.SET_SORT_DATA, payload: data});
  } catch (error) {
    put({type: actionTypes.FETCH_ERROR, payload: error});
  } finally {
    if (yield cancelled()) {
      yield put({type: actionTypes.CANCEL_SORT_DATA_FETCH});
    }
  }
}

export function* watchSortData() {
  const fetchTask = yield takeLatest(actionTypes.START_FETCH_SORT, fetchSortData);

  yield take(actionTypes.CANCEL_SORT_DATA_FETCH);
  // and that's actually works xd
  yield cancel(fetchTask);
}
