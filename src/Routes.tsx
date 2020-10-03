import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import All from './components/All.container';
import AuthFlow from './components/AuthFlow.container';
import Cart from './components/Cart.container';
import {Container} from 'rsuite';
import Kek from './Kek';
import Nav from './components/Nav.component';
import React from 'react';
import Sort from './components/Sort.component';

const RootRouter: React.FunctionComponent<any> = () => {
  return (
    <Router>
      <Container>
        <Nav></Nav>
        <Container>
          <Switch>
            <Route path='/' component={Kek} exact></Route>
            <Route path='/saved' component={Cart} exact></Route>
            <Route path='/sort' component={Sort} exact></Route>
            <Route path='/auth' component={AuthFlow} exact></Route>
            <Route path='/all' component={All} exact></Route>
          </Switch>
        </Container>
      </Container>
    </Router>
  );
};

export default RootRouter;
