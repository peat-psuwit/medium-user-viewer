// @flow

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

export type UserProfileActionsType = $Call<typeof userProfileFetchStarted>
                            | $Call<typeof userProfileFetchedSuccess, *>
                            | $Call<typeof userProfileFetchedFailed, *>;