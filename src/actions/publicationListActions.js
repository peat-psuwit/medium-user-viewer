// @flow

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

export type PublicationListActionsType = $Call<typeof publicationListFetchStarted>
                            | $Call<typeof publicationListFetchedSuccess, *>
                            | $Call<typeof publicationListFetchedFailed, *>;
