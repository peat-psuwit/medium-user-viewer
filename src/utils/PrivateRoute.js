// @flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { LOGIN_PATH } from '../App';

// Adapted from https://reacttraining.com/react-router/web/example/auth-workflow

type PrivateRoutePropsType = {
    ...$Exact<$PropertyType<Route, 'props'>>,
    isAuthenticated: boolean
};

function renderComponentOrRender(props, ChildComponent, childRender) {
    return (
        ChildComponent ? <ChildComponent {...props} />
        : childRender ? childRender(props)
        : null
    );
}

const PrivateRoute = ({
    component: ChildComponent,
    render: childRender,
    isAuthenticated,
    ...rest
}: PrivateRoutePropsType) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
            renderComponentOrRender(props, ChildComponent, childRender)
        ) : (
          <Redirect
            to={{
              pathname: LOGIN_PATH,
              state: { from: props.location }
            }}
          />
        )
      }
    />
);

export default PrivateRoute;