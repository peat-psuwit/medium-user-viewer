// @flow

import mediumAuth from '../utils/mediumAuth';

import type { StateType } from '../reducers';
import type { ActionsType } from './';

function authInitiatedAction(antiReplayState: string) {
    return {
        type: 'AUTH_INITIATED',
        antiReplayState
    };
}

export function authUpdatedAction(token: Object) {
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
        let url = mediumAuth.code.getUri({
            state: antiReplayState
        });

        // eslint-disable-next-line
        open(url, '_blank', 'width=800,height=480');

        return dispatch(authInitiatedAction(antiReplayState));
    };
}

export type AuthActionsType = $Call<typeof authInitiatedAction, string>
                            | $Call<typeof authUpdatedAction, Object>
                            | $Call<typeof authFailureAction, Error>;
