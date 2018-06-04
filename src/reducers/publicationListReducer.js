// @flow

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
        default:
            return previousState;
    }
}