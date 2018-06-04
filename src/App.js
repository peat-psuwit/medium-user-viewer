// @flow

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import PrivateRoute from './utils/PrivateRoute';
import CenteredSpinner from './utils/CenteredSpinner';
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
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
        <Container className="mb-5 mt-3">
          <h1 className='text-center mb-3'>Medium User Viewer</h1>

          {!this.props.auth
            ? <CenteredSpinner />
            : <Switch>
                <Route path={LOGIN_PATH} component={AuthPage} />
                <PrivateRoute
                  path='/'
                  component={HomePage}
                  isAuthenticated={this.props.auth.currentToken !== null}
                />
              </Switch>
          }
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProp)(App);
