// @flow

import ClientOAuth2 from 'client-oauth2';

import { MEDIUM_API_BASE_URL } from './mediumAPI';

let mediumAuth = new ClientOAuth2({
    clientId: '5926dbeb6185',
    // Insecure, but I treat public clientSecret as equivalent to no secret at all
    clientSecret: 'b20c0e22342fd77f4f5f1a45d12c7d519bf9d677',
    authorizationUri: 'https://medium.com/m/oauth/authorize',
    accessTokenUri: `${MEDIUM_API_BASE_URL}/tokens`,
    //TODO: better URL detection
    redirectUri: `${location.origin}/oauth_callback.html`,
    scopes: ['basicProfile', 'listPublications']
});