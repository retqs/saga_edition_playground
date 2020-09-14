import React from 'react';
import {RootReducerProps} from '../schemas/storeTypes';
import {connect} from 'react-redux';

const mapStateToProps = (state: RootReducerProps) => ({});

const mapDispatchToProps = {};

const Parallel: React.FunctionComponent<any> = () => {
  return (
    <div>
      <h2>haha</h2>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Parallel);
