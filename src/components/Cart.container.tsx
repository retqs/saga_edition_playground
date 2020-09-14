import {useDispatch, useSelector} from 'react-redux';

import {PostType} from '../schemas/fetchTypes';
import React from 'react';
import {RootReducerProps} from '../schemas/storeTypes';
import {removeFromSaved} from '../store/actions/searchActions';

const Cart: React.FunctionComponent<{name: string}> = () => {
  const dispatch = useDispatch();
  const {saved} = useSelector((state: RootReducerProps) => state.searchReducer);

  return (
    <div>
      {saved.length === 0 ? (
        <h2>empty list</h2>
      ) : (
        <ul>
          {saved.map((post: PostType) => (
            <div
              key={post.id}
              onClick={() => dispatch(removeFromSaved(post.id))}
            >
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </ul>
      )}
      <h2>i'm carl :-%</h2>
    </div>
  );
};

export default Cart;
