import {ActionProps} from '../../schemas/storeTypes';
import {actionTypes} from './actionTypes';

export const getSortData = (): ActionProps => ({
  type: actionTypes.START_FETCH_SORT,
});

export const handleChange = (payload: string): ActionProps<string> => ({
  type: actionTypes.SET_SEARCH_QUERY,
  payload,
});

export const setSortKey = (key: string): ActionProps<string> => ({
  type: actionTypes.SET_SORT_KEY,
  payload: key,
});

export const cancelAction = (): ActionProps => ({
  type: actionTypes.CANCEL_SORT_DATA_FETCH,
});
