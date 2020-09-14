import {PostType} from './fetchTypes';

export interface ActionProps<P = null> {
  type: string;
  payload?: P;
}

export interface FetchReducerProps {
  data: PostType[] | null;
  isLoading: boolean;
  error: string | null;
}

export interface SearchStateProps {
  query: string;
  isLoading: boolean;
  result: PostType[] | null;
  saved: PostType[];
}

export interface ToggleStateProps {
  isModalOpen: boolean;
}

export interface SortStateProps {
  data: any[];
  searchQuery: string;
  sortKey: string | null;
}

export interface ParallelProps {
  posts: any[];
  users: any[];
  comments: any[];
}

export interface RootReducerProps {
  fetchReducer: FetchReducerProps;
  searchReducer: SearchStateProps;
  toggleReducer: ToggleStateProps;
  sortReducer: SortStateProps;
  parallel: ParallelProps;
}
