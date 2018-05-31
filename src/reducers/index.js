// @flow

import { combineReducers } from 'redux';

import authReducer from './authRecucer';
import userProfileReducer from './userProfileReducer';

import type { ActionsType } from '../actions';

export default combineReducers({
    auth: authReducer,
    userProfile: userProfileReducer
});

export type StateType = {
    auth: $Call<typeof authReducer, *, ActionsType>,
    userProfile: $Call<typeof userProfileReducer, *, ActionsType>
};