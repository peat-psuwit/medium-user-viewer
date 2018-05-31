// @flow

import { getMe } from '../utils/mediumAPI';

import type { StateType } from '../reducers';
import type { ActionsType } from './';
import type { UserProfileType } from '../utils/mediumAPI';

function userProfileFetchStarted() {
    return {
        type: 'USER_PROFILE_FETCH_STARTED',
    };
}

function userProfileFetchedSuccess(data: UserProfileType) {
    return {
        type: 'USER_PROFILE_FETCH_SUCCESS',
        data
    };
}

function userProfileFetchedFailed(error: Error) {
    return {
        type: 'USER_PROFILE_FETCH_FAILED',
        error
    };
}

export function fetchUserProfile() {
    return function (dispatch: (ActionsType) => Promise<*>, getState: () => StateType) {
        const { auth } = getState();

        if (!auth || !auth.currentToken)
            return Promise.reject(new Error('fetchUserProfile: not authenticated'));

        const currentToken = auth.currentToken;

        // $FlowFixMe: still WTF
        dispatch(userProfileFetchStarted());
        return getMe(currentToken).then( (userProfile) => {
            // $FlowFixMe: still WTF
            dispatch(userProfileFetchedSuccess(userProfile));
        }).catch( (error) => {
            // $FlowFixMe: still WTF
            dispatch(userProfileFetchedFailed(error));
        });
    }
}

export type UserProfileActionsType = $Call<typeof userProfileFetchStarted>
                            | $Call<typeof userProfileFetchedSuccess, *>
                            | $Call<typeof userProfileFetchedFailed, *>;