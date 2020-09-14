import {closeModal, toggleModal} from './actions/toggleActions';

import {actionTypes} from './actions/actionTypes';

const forbidden = ['white', 'WLM', 'BLM', 'lol'];

export const forbiddenWordsMiddleware = ({dispatch}) => (next) => (action) => {
  if (action.type === actionTypes.SET_QUERY_SEARCH) {
    const found = forbidden.filter((w) => action.payload.includes(w));

    if (found.length) return dispatch(toggleModal());

    dispatch(closeModal());
  }

  return next(action);
};
