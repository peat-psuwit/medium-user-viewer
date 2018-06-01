// @flow

import { getPubContribs } from '../utils/mediumAPI';

import type { StateType } from '../reducers';
import type { ActionsType } from './';
import type { PubContribsListType } from '../utils/mediumAPI';

function pubContribsFetchStarted(publicationId: string) {
    return {
        type: 'PUB_CONTRIBS_FETCH_STARTED',
        publicationId
    };
}

function pubContribsFetchSuccess(publicationId: string, data: PubContribsListType) {
    return {
        type: 'PUB_CONTRIBS_FETCH_SUCCESS',
        publicationId,
        data
    };
}

function pubContribsFetchFailed(publicationId: string, error: Error) {
    return {
        type: 'PUB_CONTRIBS_FETCH_FAILED',
        publicationId,
        error
    };
}

function fetchPubContribs(publicationId) {
    return function (dispatch: (ActionsType) => Promise<*>, getState: () => StateType) {
        const { auth } = getState();

        if (!auth || !auth.currentToken)
            return Promise.reject(new Error('fetchPubContribs: not authenticated'));

        const currentToken = auth.currentToken;

        // $FlowFixMe: still WTF
        dispatch(pubContribsFetchStarted(publicationId));

        return getPubContribs(currentToken, publicationId)
            .then( (pubContribs) => {
                // $FlowFixMe: still WTF
                dispatch(pubContribsFetchSuccess(publicationId, pubContribs));
            }, (error) => {
                // $FlowFixMe: still WTF
                dispatch(pubContribsFetchFailed(publicationId, error));
            })
    }
}

export function fetchAllPubContribs() {
    return function (dispatch: (ActionsType) => Promise<*>, getState: () => StateType) {
        const { auth, publicationList } = getState();

        if (!auth || !auth.currentToken)
            return Promise.reject(new Error('fetchAllPubContribs: not authenticated'));

        const currentToken = auth.currentToken;

        if (!publicationList.data)
            return Promise.reject(new Error('fetchAllPubContribs: publication lisr tunknown'));

        publicationList.data.forEach( (publication) => {
            dispatch(fetchPubContribs(publication.id));
        });
    }
}

export type PubContribsActionsType = $Call<typeof pubContribsFetchStarted, *>
                                   | $Call<typeof pubContribsFetchSuccess, *, *>
                                   | $Call<typeof pubContribsFetchFailed, *, *>;