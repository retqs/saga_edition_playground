import {actionTypes} from './actionTypes';

export const requestOne = () => ({
  type: actionTypes.REQUEST_ONE,
  payload: 'payload that was hidden inside of requestOne',
});

export const requestTwo = () => ({
  type: actionTypes.REQUEST_TWO,
});

export const requestThree = () => ({
  type: actionTypes.REQUEST_THREE,
});

export const startSocketConnection = () => ({
  type: actionTypes.START_SOCKET_SUBSCRIPTION,
});

export const stopSocketConnection = () => ({
  type: actionTypes.STOP_SOCKET_SUBSCRIPTION,
});
