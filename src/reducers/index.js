//@flow

import { combineReducers } from 'redux';

import authReducer from './authRecucer';

export default combineReducers({
    auth: authReducer
});