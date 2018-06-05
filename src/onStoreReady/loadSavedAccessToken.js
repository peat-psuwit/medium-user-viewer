// @flow

import { createStore } from 'redux';

import { MEDIUM_USER_VIEWER_TOKEN } from './saveAccessToken';
import { authUpdatedAction } from '../actions/authActions';

import type { OAuthToken } from '../utils/mediumAuth';

let didCalled = false;

export default function loadSavedAccessToken(store: $Call<typeof createStore>) {
    if (didCalled)
        throw new Error('loadSavedAccessToken: called twice');

    didCalled = true;

    let savedTokenString = localStorage.getItem(MEDIUM_USER_VIEWER_TOKEN);
    let savedToken: ?OAuthToken = savedTokenString ?
                                    JSON.parse(savedTokenString) : null;

    store.dispatch(authUpdatedAction(savedToken));
}