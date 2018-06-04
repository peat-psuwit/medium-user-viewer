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
    return function (dispatch: (DispatchableActionsType) => Promise<*>, getState: () => StateType) {
        return dispatch(fetchUserProfile())
            .then( () => dispatch(fetchPublicationList()))
            .then( () => dispatch(fetchAllPubContribs()))
    }
}

export type ActionsType = UserProfileActionsType
                        | PublicationListActionsType
                        | PubContribsActionsType
                        | AuthActionsType;

export type DispatchableActionsType = ActionsType
    | (dispatch: (DispatchableActionsType) => Promise<*>, getState: () => StateType) => Promise<any>;