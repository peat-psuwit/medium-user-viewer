// @flow

import { createStore } from 'redux';
import { createSelector } from 'reselect';

import type { OAuthToken } from '../utils/mediumAuth';
import type { StateType } from '../reducers';

export const MEDIUM_USER_VIEWER_TOKEN = 'MEDIUM_USER_VIEWER_TOKEN';

let didCalled = false;

const authStateSelector = (state: StateType) => state.auth;
const authTokenSelector = createSelector(
    authStateSelector,
    (authState) => authState ? authState.currentToken : null
);

export default function saveAccessToken(store: $Call<typeof createStore>) {
    if (didCalled)
        throw new Error('loadSavedAccessToken: called twice');

    didCalled = true;

    let oldToken: ?OAuthToken = undefined;

    store.subscribe( () => {
        let currentToken = authTokenSelector(store.getState());

        if (currentToken !== oldToken) {
            if (!currentToken)
                localStorage.removeItem(MEDIUM_USER_VIEWER_TOKEN);

            else
                localStorage.setItem(MEDIUM_USER_VIEWER_TOKEN, JSON.stringify(currentToken));

            oldToken = currentToken;
        }
    });
}