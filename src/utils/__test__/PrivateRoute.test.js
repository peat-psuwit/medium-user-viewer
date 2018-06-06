// @flow

import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';

import PrivateRoute from '../PrivateRoute';
import { LOGIN_PATH } from '../../App';

const TestComponent = (props) => <div>Test</div>;
const renderFunc = (props) => <TestComponent {...props} />;

const LoginComponent = (props) => <div>Test</div>;

function renderRouter(isAuthenticated: boolean, useRenderFunc: boolean) {
    return (
        <MemoryRouter initialEntries={['/']}>
            <Switch>
                <Route path={LOGIN_PATH} component={LoginComponent} />

                <PrivateRoute
                    path='/'
                    component={useRenderFunc ? undefined : TestComponent}
                    render={useRenderFunc ? renderFunc : undefined}
                    isAuthenticated={isAuthenticated}
                />
            </Switch>
        </MemoryRouter>
    );
}

it('render given component when authenticated', () => {
    let wrapper = mount(renderRouter(true, false));

    expect(wrapper.find(TestComponent).length).toEqual(1);
    expect(wrapper.find(LoginComponent).length).toEqual(0);
});

it('render given render function when authenticated', () => {
    let wrapper = mount(renderRouter(true, true));

    expect(wrapper.find(TestComponent).length).toEqual(1);
    expect(wrapper.find(LoginComponent).length).toEqual(0);
});

it(`redirect to ${LOGIN_PATH} when not authenticated`, () => {
    let wrapper = mount(renderRouter(false, false));

    expect(wrapper.find(TestComponent).length).toEqual(0);
    expect(wrapper.find(LoginComponent).length).toEqual(1);
});