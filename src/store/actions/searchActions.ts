import {Action} from 'redux';
import {ActionProps} from '../../schemas/storeTypes';
import {PostType} from '../../schemas/fetchTypes';
import {actionTypes} from './actionTypes';

export const getQuery = (value: string): ActionProps<string> => ({
  type: actionTypes.SET_QUERY_SEARCH,
  payload: value,
});

export const resetSuggestion = (): ActionProps => ({
  type: actionTypes.REMOVE_SUGGESTIONS,
});

export const handleEdit = (id: number): ActionProps<number> => ({
  type: actionTypes.EDIT_SUGGESTIONS,
  payload: id,
});

export const addToSaved = (post: PostType): ActionProps<PostType> => ({
  type: actionTypes.ADD_TO_SAVED,
  payload: post,
});

export const removeFromSaved = (id: number): ActionProps<number> => ({
  type: actionTypes.REMOVE_FROM_SAVED,
  payload: id,
});
