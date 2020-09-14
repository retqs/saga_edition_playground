import {ActionProps} from '../../schemas/storeTypes';
import {actionTypes} from './actionTypes';

export const signin = (user: any): ActionProps => ({
  type: actionTypes.SIGN_IN,
  payload: user,
});

export const signup = (): ActionProps => ({
  type: actionTypes.SIGN_UP,
});

export const logout = (): ActionProps => ({
  type: actionTypes.LOGOUT,
});
