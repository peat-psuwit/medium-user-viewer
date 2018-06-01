// @flow

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

import type { StateType } from './reducers';

import './App.css';

export const LOGIN_PATH = '/login';

function mapStateToProp(state: StateType) {
  return {
    auth: state.auth
  };
}

class App extends Component<$Call<typeof mapStateToProp, *>> {
  render() {
    if (!this.props.auth)
      // TODO: spinner
      return <h1>Loading...</h1>

    return (
      <BrowserRouter>
        <Container>
          <h1 className='text-center'>Medium User Viewer</h1>

          <Switch>
            <Route path={LOGIN_PATH} component={AuthPage} />
            <PrivateRoute
              path='/'
              component={HomePage}
              isAuthenticated={this.props.auth.currentToken !== null}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProp)(App);
