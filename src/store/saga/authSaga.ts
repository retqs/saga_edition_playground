import {call, cancel, cancelled, fork, put, take} from 'redux-saga/effects';

import {actionTypes} from '../actions/actionTypes';
import axios from 'axios';

interface UserModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

function* clearToken(token: string) {
  try {
    console.log('token has been deleted');
  } catch (error) {
    console.log('error while delteing token');
  }
}
// write custom back to get such model
async function getUser(user: UserModel): Promise<any> {
  return await axios.post('http://localhost:2000/api/signin', user);
}

function* signinRoute(user: UserModel) {
  try {
    const {data} = yield call(getUser, user);
    console.log(data.token, 'tim token');
  } catch (error) {
    yield put({type: actionTypes.AUTH_ERROR});
  } finally {
    if (yield cancelled()) {
      console.log('finally ---- that request was cancelled');
    }
  }
}

function* signupRoute() {
  try {
    console.log('some actions in signup route');
  } catch (error) {
    yield put({type: actionTypes.AUTH_ERROR});
  }
}

export function* watchAuthFlow() {
  while (true) {
    const {payload} = yield take(actionTypes.SIGN_IN);

    // fork is used here to make it none blocking call
    const signinTask = yield fork(signinRoute, payload);

    // that line of code blocks other actions
    // yield take(actionTypes.SIGN_UP);

    // const signupTask = yield call(signupRoute);

    const action = yield take([actionTypes.LOGOUT, actionTypes.AUTH_ERROR]);

    if (action.type === actionTypes.LOGOUT) {
      yield cancel(signinTask);
    }
    yield call(clearToken, 'I`m token remove me');
  }
}
