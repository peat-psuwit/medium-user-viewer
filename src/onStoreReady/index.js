// @flow

import { createStore } from 'redux';

import registerAuthCodeMessageListener from './registerAuthCodeMessageListener';

export default function onStoreReady(store: $Call<typeof createStore>) {
    registerAuthCodeMessageListener(store);
}