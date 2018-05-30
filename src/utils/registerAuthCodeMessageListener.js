// @flow

import { createStore } from 'redux';

import { finishAuth } from '../actions/authActions';

let didRegistered = false;

export default function registerAuthCodeMessageListener(store: $Call<typeof createStore>) {
    if (didRegistered)
        throw new Error('registerAuthCodeMessageListener: called twice');

    didRegistered = true;

    function receiveMessage(event) {
        // Allow same origin only
        // eslint-disable-next-line
        if (event.origin !== location.origin)
            return;
    
        let { type, url } = event.data;

        if (type !== 'authz_code_received')
            return;
    
        if (!url) {
            console.error('URL not received.');
            return;
        }
    
        store.dispatch(finishAuth(url));
    }

    window.addEventListener('message', receiveMessage, false);
}