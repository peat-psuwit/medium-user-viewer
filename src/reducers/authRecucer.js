// @flow

import { AUTH_INITIATED,
         AUTH_UPDATED,
         AUTH_FAILURE } from '../actions/authActions';

import type { OAuthToken } from '../utils/mediumAuth';
import type { ActionsType } from '../actions';

type AuthState = {
    currentToken: ?OAuthToken,
    pendingAuth?: {
        antiReplayState: string
    },
    authFailure?: Error
};

export default function authReducer(
    previousState: ?AuthState = null,
    action: ActionsType
): ?AuthState { // Yes, this reducer can return undefined, because initialisation
                // can be asynchronous
    switch (action.type) {
        case AUTH_INITIATED:
            return {
                currentToken: previousState? previousState.currentToken : null,
                pendingAuth: {
                    antiReplayState: action.antiReplayState
                }
            };

        case AUTH_UPDATED:
            return {
                currentToken: action.token
            };

        case AUTH_FAILURE:
            return {
                currentToken: previousState? previousState.currentToken : null,
                authFailure: action.err
            };

        default:
            return previousState;
    }
};