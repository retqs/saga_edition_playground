import {
  call,
  cancel,
  delay,
  fork,
  put,
  take,
  throttle,
} from 'redux-saga/effects';

import {ActionProps} from '../../schemas/storeTypes';
import {PostType} from '../../schemas/fetchTypes';
import {actionTypes} from '../../store/actions/actionTypes';

async function getData(quantity: number): Promise<PostType[]> {
  return await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${quantity}`
  ).then((d) => d.json());
}

function* fetchSearchData(quantity: number) {
  try {
    yield put({type: actionTypes.SET_SEARCH_LOADING});
    yield delay(1500);
    // call(fn,args) the same works for fork
    // Supports invoking forked functions with a this context

    const data: PostType[] = yield call(getData, quantity);
    // creates dispatch effect
    yield put({type: actionTypes.GET_POSTS_BY_QUERY, payload: data});
  } catch (error) {
    yield put({
      type: actionTypes.SET_ERROR_SEARCH,
      payload: 'error while loading data',
    });
  } finally {
    yield put({type: actionTypes.REMOVE_SUGGESTIONS_LOADING});
  }
}

export function* watchSearchFetch() {
  let task;
  while (true) {
    const {payload} = yield take(actionTypes.SET_QUERY_SEARCH);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(fetchSearchData, payload);

    console.log(payload);

    if (payload.length === 0) {
      yield take(actionTypes.REMOVE_SUGGESTIONS);

      yield cancel(task);
    }
  }

  // yield throttle(1500, actionTypes.SET_QUERY_SEARCH, fetchSearchData);
}
