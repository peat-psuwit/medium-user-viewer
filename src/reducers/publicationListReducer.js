// @flow

import { AUTH_UPDATED } from '../actions/authActions';

import type { PublicationListType } from '../utils/mediumAPI';
import type { ActionsType } from '../actions';

type PublicationListState = {
    isLoading: boolean,
    data: ?PublicationListType,
    error: ?Error
};

const defaultState: PublicationListState = {
    isLoading: false,
    data: null,
    error: null
};

export default function publicationListReducer(
    previousState: PublicationListState = defaultState,
    action: ActionsType
): PublicationListState {
    switch (action.type) {
        case 'PUBLICATION_LIST_FETCH_STARTED':
            return {
                ...previousState,
                isLoading: true
            };
        case 'PUBLICATION_LIST_FETCH_SUCCESS':
            return {
                isLoading: false,
                data: action.data,
                error: null
            };
        case 'PUBLICATION_LIST_FETCH_FAILED':
            return {
                isLoading: false,
                data: null,
                error: action.error
            };

        case AUTH_UPDATED:
            // If user logged out, this publication list isn't correct anymore
            if (!action.token)
                return defaultState;
            else
                return previousState;

        default:
            return previousState;
    }
}