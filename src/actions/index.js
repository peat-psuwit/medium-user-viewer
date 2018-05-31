// @flow

import type { AuthActionsType } from "./authActions";
import type { UserProfileActionsType } from './userProfileActions';
import type { PublicationListActionsType } from './publicationListActions';

export type ActionsType = AuthActionsType
                        | UserProfileActionsType
                        | PublicationListActionsType;