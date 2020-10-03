import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

import {ActionProps} from '../../schemas/storeTypes';
import {PostType} from '../../schemas/fetchTypes';
import {actionTypes} from '../actions/actionTypes';
import {startFetch} from '../actions/fetchUsers';

// fork - non-blocking call on fn,takes in fn and args that will be passed in fn

async function getData(): Promise<PostType[]> {
  return await fetch('https://jsonplaceholder.typicode.com/posts').then((d) => d.json());
}

function* fetchData(action: ActionProps) {
  try {
    const data: PostType[] = yield call(getData);
    yield put({type: actionTypes.FETCH_DATA, payload: data});
  } catch (error) {
    yield put({type: actionTypes.FETCH_ERROR, payload: error});
  }
}

export function* watchFetchData(props: any) {
  yield takeLatest(actionTypes.FETCH_START, fetchData);
}
