// @flow

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

export type AuthActionsType = $Call<typeof authInitiatedAction, string>
                            | $Call<typeof authUpdatedAction, Object>
                            | $Call<typeof authFailureAction, Error>;
