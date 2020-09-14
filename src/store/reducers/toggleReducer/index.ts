import {ActionProps, ToggleStateProps} from '../../../schemas/storeTypes';

import {actionTypes} from '../../actions/actionTypes';

const initialState = {
  isModalOpen: false,
};

export default (
  state: ToggleStateProps = initialState,
  {type, payload}: ActionProps
): ToggleStateProps => {
  switch (type) {
    case actionTypes.TOGGLE_MODAL:
      return {...state, isModalOpen: !state.isModalOpen};

    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };

    default:
      return state;
  }
};
