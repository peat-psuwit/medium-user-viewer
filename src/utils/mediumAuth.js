// @flow

import querystring from 'querystring';
import axios from 'axios';

import { MEDIUM_API_BASE_URL } from './mediumAPI';

const MEDIUM_OAUTH_OPTIONS = {
    clientId: '5926dbeb6185',
    // Insecure, but I treat public clientSecret as equivalent to no secret at all
    clientSecret: 'b20c0e22342fd77f4f5f1a45d12c7d519bf9d677',
    authorizationUri: 'https://medium.com/m/oauth/authorize',
    accessTokenUri: `${MEDIUM_API_BASE_URL}/tokens`,
    //TODO: better URL detection
    // eslint-disable-next-line
    redirectUri: `${location.origin}/oauth_callback.html`,
    scopes: 'basicProfile,listPublications'
};

export function getAuthorizationURI(state: string): string {
    var url = new URL(MEDIUM_OAUTH_OPTIONS.authorizationUri);

    url.search = querystring.stringify({
        client_id: MEDIUM_OAUTH_OPTIONS.clientId,
        scope: MEDIUM_OAUTH_OPTIONS.scopes,
        state,
        response_type: 'code',
        redirect_uri: MEDIUM_OAUTH_OPTIONS.redirectUri
    });

    return url.href;
}

export type OAuthToken = {
    "token_type": "Bearer",
    "access_token": string,
    "refresh_token": string,
    "scope": string,
    "expires_at": number
};

export function getToken(url: string, originalState: string): Promise<OAuthToken> {
    var parsedUrl = new URL(url);

    if (parsedUrl.searchParams.get('error')) {
        let error = new Error(`getToken: OAuth error received: ${parsedUrl.searchParams.get('error')}`);
        error.name = 'OAuthError';
        return Promise.reject(error);
    }

    let state = parsedUrl.searchParams.get('state');
    let code = parsedUrl.searchParams.get('code');

    if (state !== originalState)
        return Promise.reject(new Error('getToken: incorrect state'));

    let body = querystring.stringify({
        code,
        client_id: MEDIUM_OAUTH_OPTIONS.clientId,
        client_secret: MEDIUM_OAUTH_OPTIONS.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: MEDIUM_OAUTH_OPTIONS.redirectUri
    });

    let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    };

    return axios.post(MEDIUM_OAUTH_OPTIONS.accessTokenUri, body, { headers })
        .then( (response) => response.data );
}