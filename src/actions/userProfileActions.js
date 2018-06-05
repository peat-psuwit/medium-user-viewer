// @flow

import { getMe } from '../utils/mediumAPI';

import type { StateType } from '../reducers';
import type { DispatchableActionsType } from './';
import type { UserProfileType } from '../utils/mediumAPI';

export const USER_PROFILE_FETCH_STARTED = 'USER_PROFILE_FETCH_STARTED';
export const USER_PROFILE_FETCH_SUCCESS = 'USER_PROFILE_FETCH_SUCCESS';
export const USER_PROFILE_FETCH_FAILED = 'USER_PROFILE_FETCH_FAILED';

function userProfileFetchStarted() {
    return {
        type: USER_PROFILE_FETCH_STARTED,
    };
}

function userProfileFetchedSuccess(data: UserProfileType) {
    return {
        type: USER_PROFILE_FETCH_SUCCESS,
        data
    };
}

function userProfileFetchedFailed(error: Error) {
    return {
        type: USER_PROFILE_FETCH_FAILED,
        error
    };
}

export function fetchUserProfile() {
    return function (dispatch: (DispatchableActionsType) => Promise<*>, getState: () => StateType) {
        const { auth } = getState();

        if (!auth || !auth.currentToken)
            return Promise.reject(new Error('fetchUserProfile: not authenticated'));

        const currentToken = auth.currentToken;

        dispatch(userProfileFetchStarted());
        return getMe(currentToken).then( (userProfile) => {
            dispatch(userProfileFetchedSuccess(userProfile));
        }).catch( (error) => {
            dispatch(userProfileFetchedFailed(error));
        });
    }
}

export type UserProfileActionsType = $Call<typeof userProfileFetchStarted>
                            | $Call<typeof userProfileFetchedSuccess, *>
                            | $Call<typeof userProfileFetchedFailed, *>;