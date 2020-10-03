import {actionTypes} from '../../actions/actionTypes';

const initialState = {
  currency: {
    val: 0,
    type: 'UNKNOWN',
  },
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.SET_CURRENCY:
      return {
        ...state,
        currency: payload,
      };

    default:
      return state;
  }
};
