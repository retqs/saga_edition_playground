import {FetchReducerProps, RootReducerProps, SearchStateProps} from './schemas/storeTypes';
import React, {useCallback, useEffect, useState} from 'react';
import {addToSaved, getQuery, resetSuggestion} from './store/actions/searchActions';
import {startSub, stopSub} from './store/actions/socketActions';
import {useDispatch, useSelector} from 'react-redux';

import {PostType} from './schemas/fetchTypes';
import {startFetch} from './store/actions/fetchUsers';
import {toggleModal} from './store/actions/toggleActions';

// useCallback isn't suitable for App component will fire an error

function Kek() {
  const dispatch = useDispatch();

  const data = useSelector((state: RootReducerProps) => state.fetchReducer.data);
  const isModalOpen = useSelector(
    (state: RootReducerProps): boolean => state.toggleReducer.isModalOpen
  );
  const {isLoading: isFetching} = useSelector(
    (state: RootReducerProps): FetchReducerProps => state.fetchReducer
  );
  const {result, query, isLoading} = useSelector(
    (state: RootReducerProps): SearchStateProps => state.searchReducer
  );

  useEffect(() => {
    dispatch(startFetch());
  }, []);

  useEffect(() => {
    if (query.length === 0) dispatch(resetSuggestion());
  }, [query]);

  if (isFetching) return <h1>I"M LOADING :-)</h1>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(getQuery(e.target.value));

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={() => dispatch(startSub())}>sub</button>
        <button onClick={() => dispatch(stopSub())}>cancel sub</button>
        <hr />
        <input value={query} onChange={handleChange} type='text' />
        <button onClick={() => dispatch(toggleModal())}>close modal</button>
        {isModalOpen && <h2>NO ONE LIVE'S MATTER YOU CUNT</h2>}
      </header>

      <section style={{minHeight: '100vh'}}>
        <ul>
          {query.length > 0 && isLoading && 'loading'}
          {result !== null &&
            (result.length === 0 ? (
              <h2>empty suggestions list</h2>
            ) : (
              result.map((item: PostType) => {
                return (
                  <h2 key={item.id}>
                    <button onClick={() => dispatch(addToSaved(item))}>get by id</button>
                    {item.title}
                  </h2>
                );
              })
            ))}
        </ul>
      </section>

      <section style={{minHeight: '100vh'}}>
        {data?.map((post: PostType) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Kek;
