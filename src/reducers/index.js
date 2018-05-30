// @flow

import { combineReducers } from 'redux';

import authReducer from './authRecucer';

export default combineReducers({
    auth: authReducer
});

export type StateType = {
    auth: $Call<typeof authReducer, *, *>
};