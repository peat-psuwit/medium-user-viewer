// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ContextRouter } from 'react-router-dom';

import { fetchAll } from '../../actions';

import type { StateType } from '../../reducers';

import getFilteredPublicationList from './getFilteredPublicationList';

import UserProfile from './UserProfile';
import PublicationList from './PublicationList';

function mapStateToProp(state: StateType) {
    return {
        userProfile: state.userProfile,
        filteredPublicationList: getFilteredPublicationList(state)
    };
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
                <hr />
                <h4>This user's publication</h4>
                <PublicationList
                    isLoading={this.props.filteredPublicationList.isLoading}
                    publicationList={this.props.filteredPublicationList.data}
                />
            </div>
        );
    }
}

export default connect(mapStateToProp, dispatchToPropMap)(HomePage);