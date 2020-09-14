import {actionTypes} from './actionTypes';

export const startFetch = () => ({
  type: actionTypes.FETCH_START,
  payload: 'default',
});
