// @flow

import type { PubContribsListType } from '../utils/mediumAPI';
import type { ActionsType } from '../actions';

type PubContribsSubState = {
    isLoading: boolean,
    data: ?PubContribsListType,
    error: ?Error
};

const defaultSubState = {
    isLoading: false,
    data: null,
    error: null
};

function pubContribsSubReducer(
    previousState: PubContribsSubState = defaultSubState,
    // $FlowFixMe: All branches are incompatible, but it's union?
    action: ActionsType
): PubContribsSubState {
    switch (action.type) {
        case 'PUB_CONTRIBS_FETCH_STARTED':
            return {
                ...previousState,
                isLoading: true
            };
        case 'PUB_CONTRIBS_FETCH_SUCCESS':
            return {
                isLoading: false,
                data: action.data,
                error: null
            };
        case 'PUB_CONTRIBS_FETCH_FAILED':
            return {
                isLoading: false,
                data: null,
                error: action.error
            };
        default:
            return previousState;
    }
}

type PubContribsState = {
    [publicationId: string]: PubContribsSubState
};

export default function pubContribsReducer(
    previousState: PubContribsState = {},
    // $FlowFixMe: All branches are incompatible, but it's union?
    action: ActionsType
): PubContribsState {
    switch (action.type) {
        case 'PUB_CONTRIBS_FETCH_STARTED':
        case 'PUB_CONTRIBS_FETCH_SUCCESS':
        case 'PUB_CONTRIBS_FETCH_FAILED':
            return {
                ...previousState,
                [action.publicationId]: pubContribsSubReducer(
                    previousState[action.publicationId],
                    action
                )
            };
        default:
            return previousState;
    }
}