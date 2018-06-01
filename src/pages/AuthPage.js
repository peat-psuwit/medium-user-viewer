// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

import type { ContextRouter } from 'react-router-dom';

import { initiateAuth } from '../actions/authActions';

import type { StateType } from '../reducers';

function mapStateToProp(state: StateType) {
    return {
      auth: state.auth
    };
}

const dispatchToPropMap = {
    initiateAuth
};

type PropsType = {
    ...$Call<typeof mapStateToProp, *>,
    ...typeof dispatchToPropMap,
    ...ContextRouter
};

class AuthPage extends Component<PropsType> {
    render() {
        if (this.props.auth && this.props.auth.currentToken) {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            return <Redirect to={from} />;
        }

        const isButtonDisabled: boolean = !!(this.props.auth && this.props.auth.pendingAuth);

        return (
            <div className='text-center'>
                <Button
                    color='primary'
                    disabled={isButtonDisabled}
                    onClick={this.props.initiateAuth}
                >
                    Login with Medium account
                </Button>
            </div>
        );
    }
}

export default connect(mapStateToProp, dispatchToPropMap)(AuthPage);
