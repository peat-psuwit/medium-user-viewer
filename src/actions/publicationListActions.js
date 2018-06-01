// @flow

import { getUserPublication } from '../utils/mediumAPI';

import type { StateType } from '../reducers';
import type { ActionsType } from './';
import type { PublicationListType } from '../utils/mediumAPI';

function publicationListFetchStarted() {
    return {
        type: 'PUBLICATION_LIST_FETCH_STARTED',
    };
}

function publicationListFetchedSuccess(data: PublicationListType) {
    return {
        type: 'PUBLICATION_LIST_FETCH_SUCCESS',
        data
    };
}

function publicationListFetchedFailed(error: Error) {
    return {
        type: 'PUBLICATION_LIST_FETCH_FAILED',
        error
    };
}

export function fetchPublicationList() {
    return function (dispatch: (ActionsType) => Promise<*>, getState: () => StateType) {
        const { auth, userProfile } = getState();

        if (!auth || !auth.currentToken)
            return Promise.reject(new Error('fetchPublicationList: not authenticated'));

        const currentToken = auth.currentToken;

        if (!userProfile.data)
            return Promise.reject(new Error('fetchPublicationList: userId unknown'));

        const userId = userProfile.data.id;

        // $FlowFixMe: still WTF
        dispatch(publicationListFetchStarted());
        return getUserPublication(currentToken, userId).then( (publicationList) => {
            // $FlowFixMe: still WTF
            dispatch(publicationListFetchedSuccess(publicationList));
        }).catch( (error) => {
            // $FlowFixMe: still WTF
            dispatch(publicationListFetchedFailed(error));
        });
    }
}

export type PublicationListActionsType = $Call<typeof publicationListFetchStarted>
                            | $Call<typeof publicationListFetchedSuccess, *>
                            | $Call<typeof publicationListFetchedFailed, *>;
