import {ActionProps, RootReducerProps} from '../schemas/storeTypes';
import {Button, Divider} from 'rsuite';
import {logout, signin, signup} from '../store/actions/authActions';

import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state: RootReducerProps) => ({});

const mapDispatchToProps = {
  signin,
  signup,
  logout,
};

type User = {
  email: string;
  password: string;
  rememberMe: boolean;
};

interface AuthInterface {
  signin(user: User): ActionProps<User>;
  signup(): ActionProps;
  logout(): ActionProps;
}

const AuthFlow: React.FunctionComponent<AuthInterface> = ({signin, signup, logout}) => {
  return (
    <div>
      <Button
        onClick={() =>
          signin({
            email: '2@gmail.com',
            password: '1234567',
            rememberMe: true,
          })
        }
      >
        Login
      </Button>
      <Divider vertical></Divider>

      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFlow);
