// @flow

import type { AuthActionsType } from "./authActions";
import type { UserProfileActionsType } from './userProfileActions';
import type { PublicationListActionsType } from './publicationListActions';
import type { PubContribsActionsType } from './publicationContributorsActions';

export type ActionsType = AuthActionsType
                        | UserProfileActionsType
                        | PublicationListActionsType
                        | PubContribsActionsType;