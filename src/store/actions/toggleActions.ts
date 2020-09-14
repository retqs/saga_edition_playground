import {ActionProps} from '../../schemas/storeTypes';
import {actionTypes} from './actionTypes';

export const toggleModal = (): ActionProps => ({
  type: actionTypes.TOGGLE_MODAL,
});
export const closeModal = (): ActionProps => ({type: actionTypes.CLOSE_MODAL});
export const openModal = (): ActionProps => ({type: actionTypes.OPEN_MODAL});
