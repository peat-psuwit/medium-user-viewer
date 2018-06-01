// @flow

import type { StateType } from '../reducers';

import type { AuthActionsType } from "./authActions";
import type { UserProfileActionsType } from './userProfileActions';
import type { PublicationListActionsType } from './publicationListActions';
import type { PubContribsActionsType } from './publicationContributorsActions';

export type ActionsType = AuthActionsType
                        | UserProfileActionsType
                        | PublicationListActionsType
                        | PubContribsActionsType
                        // Thunk
                        | (dispatch: (ActionsType) => Promise<*>, getState: () => StateType) => Promise<any>;