import {ActionProps, FetchReducerProps} from '../../../schemas/storeTypes';

import {actionTypes} from '../../actions/actionTypes';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

export default (
  state: FetchReducerProps = initialState,
  {type, payload}: ActionProps
): FetchReducerProps => {
  switch (type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_DATA:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case actionTypes.REMOVE_SEARCH_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
