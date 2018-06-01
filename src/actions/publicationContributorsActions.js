// @flow

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

export type PubContribsActionsType = $Call<typeof pubContribsFetchStarted, *>
                                   | $Call<typeof pubContribsFetchSuccess, *, *>
                                   | $Call<typeof pubContribsFetchFailed, *, *>;