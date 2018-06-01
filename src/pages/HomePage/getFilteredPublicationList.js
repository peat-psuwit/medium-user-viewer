// @flow

import { createSelector } from 'reselect';
import _ from 'lodash';

import type { StateType } from '../../reducers';
import type { PublicationListType } from '../../utils/mediumAPI';

const pubListStateSelector = (state: StateType) => state.publicationList;
const pubContribsStateSelector = (state: StateType) => state.pubContribs;
const userProfileStateSelector = (state: StateType) => state.userProfile;


const pubListIsLoadingSelector = createSelector(
    pubListStateSelector,
    (publicationListState) => publicationListState.isLoading
);

const pubContribsIsLoadingSelector = createSelector(
    pubContribsStateSelector,
    (pubContribsState) => _.some(pubContribsState, 'isLoading')
);

const filteredPubListIsLoadingSelector = createSelector(
    pubListIsLoadingSelector,
    pubContribsIsLoadingSelector,
    (pubListIsLoading, pubContribsIsLoading) => pubContribsIsLoading || pubContribsIsLoading
);


const pubListErrorSelector = createSelector(
    pubListStateSelector,
    (pubListState) => pubListState.error
);

const pubContribsErrorSelector = createSelector(
    pubContribsStateSelector,
    (pubContribsState) => {
        let errorPub = _.find(pubContribsState, 'error');
        return errorPub ? errorPub.error : null;
    }
);

const filteredPubListErrorSelector = createSelector(
    pubListErrorSelector,
    pubContribsErrorSelector,
    (pubListError, pubContribsError) => pubListError || pubContribsError
);


const pubListDataSelector = createSelector(
    pubListStateSelector,
    (pubListState) => pubListState.data
);

const filteredPubListDataSelector = createSelector(
    pubListDataSelector,
    pubContribsStateSelector,
    userProfileStateSelector,
    (pubListData, pubContribsState, userProfileState) => {
        if (!pubListData || !_.every(pubContribsState, 'data') || !userProfileState.data)
            return null;

        const userId = userProfileState.data.id;

        return pubListData.filter(
            (publication) => {
                let pubContribsSubState = pubContribsState[publication.id];
                if (!pubContribsSubState || !pubContribsSubState.data)
                    return false;
                return _.some(pubContribsSubState.data, ['userId', userId]);
            }
        );
    }
);


const getFilteredPublicationList = createSelector(
    filteredPubListIsLoadingSelector,
    filteredPubListDataSelector,
    filteredPubListErrorSelector,
    (isLoading, data, error) => ({
        isLoading,
        data,
        error
    }: {
        isLoading: boolean,
        data: ?PublicationListType,
        error: ?Error
    })
);

export default getFilteredPublicationList;