// @flow

import { AUTH_UPDATED } from '../actions/authActions';

import type { UserProfileType } from '../utils/mediumAPI';
import type { ActionsType } from '../actions';

type UserProfileState = {
    isLoading: boolean,
    data: ?UserProfileType,
    error: ?Error
};

const defaultState: UserProfileState = {
    isLoading: false,
    data: null,
    error: null
};

export default function userProfileReducer(
    previousState: UserProfileState = defaultState,
    action: ActionsType
): UserProfileState {
    switch (action.type) {
        case 'USER_PROFILE_FETCH_STARTED':
            return {
                ...previousState,
                isLoading: true
            };
        case 'USER_PROFILE_FETCH_SUCCESS':
            return {
                isLoading: false,
                data: action.data,
                error: null
            };
        case 'USER_PROFILE_FETCH_FAILED':
            return {
                isLoading: false,
                data: null,
                error: action.error
            };

        case AUTH_UPDATED:
            // If user logged out, this user profile isn't correct anymore
            if (!action.token)
                return defaultState;
            else
                return previousState;

        default:
            return previousState;
    }
}
