import {ActionProps, SearchStateProps} from '../../../schemas/storeTypes';

import {PostType} from '../../../schemas/fetchTypes';
import {actionTypes} from '../../actions/actionTypes';

const initialState = {
  query: '',
  isLoading: false,
  result: null,
  saved: [],
};
// find the way to work around any,shouldn't be like that
export default (
  state: SearchStateProps = initialState,
  {type, payload}: ActionProps<any>
): SearchStateProps => {
  switch (type) {
    case actionTypes.SET_QUERY_SEARCH:
      return {...state, query: payload};

    case actionTypes.ADD_TO_SAVED:
      return {
        ...state,
        saved: [...state.saved, payload],
      };

    case actionTypes.REMOVE_FROM_SAVED:
      return {
        ...state,
        saved: state.saved.filter((s) => s.id !== payload),
      };

    case actionTypes.SET_SEARCH_LOADING:
      return {
        ...state,
        isLoading: true,
        result: null,
      };

    case actionTypes.GET_POSTS_BY_QUERY:
      return {
        ...state,
        result: payload,
      };

    case actionTypes.REMOVE_SUGGESTIONS_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.REMOVE_SUGGESTIONS:
      return {
        ...state,
        result: null,
      };

    default:
      return state;
  }
};

const handleEdit = (state: SearchStateProps, update: ActionProps) => {
  const updated = state.result?.filter(
    //@ts-ignore
    (post: PostType) => post.id !== update.payload
  );
  console.log(state);
};
