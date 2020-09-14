import {ActionProps} from '../../schemas/storeTypes';
import {actionTypes} from './actionTypes';

export const startSub = (): ActionProps => ({
  type: actionTypes.START_SOCKET_SUBSCRIPTION,
});

export const stopSub = (): ActionProps => ({
  type: actionTypes.STOP_SOCKET_SUBSCRIPTION,
});
