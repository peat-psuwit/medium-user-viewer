// @flow

import { createStore } from 'redux';

import registerAuthCodeMessageListener from './registerAuthCodeMessageListener';
import loadSavedAccessToken from './loadSavedAccessToken';

export default function onStoreReady(store: $Call<typeof createStore>) {
    registerAuthCodeMessageListener(store);
    loadSavedAccessToken(store);
}