// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ContextRouter } from 'react-router-dom';

import { fetchAll } from '../../actions';

import type { StateType } from '../../reducers';

import UserProfile from './UserProfile';

function mapStateToProp(state: StateType) {
    return {
        userProfile: state.userProfile
    }
}

const dispatchToPropMap = {
    fetchAll
};

type PropsType = {
    ...$Call<typeof mapStateToProp, *>,
    ...typeof dispatchToPropMap,
    ...ContextRouter
};

class HomePage extends Component<PropsType> {
    componentDidMount() {
        this.props.fetchAll();
    }

    render() {
        return (
            <div>
                <UserProfile
                    isLoading={this.props.userProfile.isLoading}
                    userProfile={this.props.userProfile.data}
                />
            </div>
        );
    }
}

export default connect(mapStateToProp, dispatchToPropMap)(HomePage);