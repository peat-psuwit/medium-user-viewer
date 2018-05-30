// @flow

import { getAuthorizationURI, getToken } from '../utils/mediumAuth';

import type { OAuthToken } from '../utils/mediumAuth';
import type { StateType } from '../reducers';
import type { ActionsType } from './';

function authInitiatedAction(antiReplayState: string) {
    return {
        type: 'AUTH_INITIATED',
        antiReplayState
    };
}

export function authUpdatedAction(token: OAuthToken) {
    return {
        type: 'AUTH_UPDATED',
        token
    };
}

function authFailureAction(err: Error) {
    return {
        type: 'AUTH_FAILURE',
        err
    };
}

export function initiateAuth() {
    return function (dispatch: (ActionsType) => Promise<*>, getState: () => StateType) {
        let { auth } = getState();

        if (auth && auth.currentToken)
            return Promise.reject(new Error('User already authenticated.'));

        let antiReplayState = Math.random().toString(10);
        let url = getAuthorizationURI(antiReplayState);

        // eslint-disable-next-line
        open(url, '_blank', 'width=800,height=480');

        return dispatch(authInitiatedAction(antiReplayState));
    };
}

export function finishAuth(url: string) {
    return function (dispatch: (ActionsType) => Promise<*>, getState: () => StateType) {
        let { auth } = getState();

        if (!auth || !auth.pendingAuth)
            return Promise.reject(new Error('finishAuth: no pending auth.'));

        let { antiReplayState } = auth.pendingAuth;

        return getToken(url, antiReplayState).then( (token) => {
            dispatch(authUpdatedAction(token));
        }).catch( (err) => {
            console.error(err);
            dispatch(authFailureAction(err));
        });
    }
}

export type AuthActionsType = $Call<typeof authInitiatedAction, string>
                            | $Call<typeof authUpdatedAction, Object>
                            | $Call<typeof authFailureAction, Error>;
