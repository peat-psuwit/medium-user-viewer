// @flow

import type { ActionsType } from '../actions';

type AuthState = {
    currentToken: ?Object, //client-oauth2's token
    pendingAuth?: {
        antiReplayState: string
    },
    authFailure?: Error
};

export default function authReducer(
    previousState: ?AuthState,
    action: ActionsType
): ?AuthState { // Yes, this reducer can return undefined, because initialisation
                // can be asynchronous
    switch (action.type) {
        case 'AUTH_INITIATED':
            return {
                currentToken: previousState? previousState.currentToken : null,
                pendingAuth: {
                    antiReplayState: action.antiReplayState
                }
            };

        case 'AUTH_UPDATED':
            return {
                currentToken: action.token
            };

        case 'AUTH_FAILURE':
            return {
                currentToken: previousState? previousState.currentToken : null,
                authFailure: action.err
            };

        default:
            return previousState;
    }
};