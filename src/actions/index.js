// @flow

import { fetchUserProfile } from './userProfileActions';
import { fetchPublicationList } from './publicationListActions';
import { fetchAllPubContribs } from './publicationContributorsActions';

import type { StateType } from '../reducers';

import type { AuthActionsType } from "./authActions";
import type { UserProfileActionsType } from './userProfileActions';
import type { PublicationListActionsType } from './publicationListActions';
import type { PubContribsActionsType } from './publicationContributorsActions';

export function fetchAll() {
    return function (dispatch: (ActionsType) => Promise<*>, getState: () => StateType) {
        return dispatch(fetchUserProfile())
            .then( () => dispatch(fetchPublicationList()))
            .then( () => dispatch(fetchAllPubContribs()))
    }
}

export type ActionsType = AuthActionsType
                        | UserProfileActionsType
                        | PublicationListActionsType
                        | PubContribsActionsType
                        // Thunk
                        | (dispatch: (ActionsType) => Promise<*>, getState: () => StateType) => Promise<any>;