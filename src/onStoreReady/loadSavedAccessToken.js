// @flow

import { createStore } from 'redux';

import { authUpdatedAction } from '../actions/authActions';

let didCalled = false;

export default function loadSavedAccessToken(store: $Call<typeof createStore>) {
    if (didCalled)
        throw new Error('loadSavedAccessToken: called twice');

    didCalled = true;

    // Stub
    store.dispatch(authUpdatedAction(null));
}