// @flow

import { combineReducers } from 'redux';

import authReducer from './authRecucer';
import userProfileReducer from './userProfileReducer';
import publicationListReducer from './publicationListReducer';
import pubContribsReducer from './publicationContributorsReducer';

import type { ActionsType } from '../actions';

export default combineReducers({
    auth: authReducer,
    userProfile: userProfileReducer,
    publicationList: publicationListReducer,
    pubContribs: pubContribsReducer
});

export type StateType = {
    auth: $Call<typeof authReducer, *, ActionsType>,
    userProfile: $Call<typeof userProfileReducer, *, ActionsType>,
    publicationList: $Call<typeof publicationListReducer, *, ActionsType>,
    pubContribs: $Call<typeof pubContribsReducer, *, ActionsType>
};