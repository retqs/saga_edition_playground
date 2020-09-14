import {ActionProps, SortStateProps} from '../../../schemas/storeTypes';

import {actionTypes} from '../../actions/actionTypes';

const initialState = {
  data: [],
  searchQuery: '',
  sortKey: null,
};

export default (state: SortStateProps = initialState, {type, payload}: ActionProps) => {
  switch (type) {
    case actionTypes.SET_SORT_DATA:
      return {...state, data: payload};

    case actionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload,
      };

    case actionTypes.SET_SORT_KEY:
      return {
        ...state,
        sortKey: payload,
      };

    default:
      return state;
  }
};
