// @flow

import axios from 'axios';

import type { OAuthToken } from './mediumAuth';

export const MEDIUM_API_BASE_URL = 'http://localhost:8080/https://api.medium.com/v1';

function getAuthorizationHeader(token: OAuthToken) {
    return {
        'Authorization': `Bearer ${token.access_token}`
    };
}

export type UserProfileType = {
    id: string,
    username: string,
    name: string,
    url: string,
    imageUrl: string
};

export function getMe(token: OAuthToken): Promise<UserProfileType> {
    return axios.get(`${MEDIUM_API_BASE_URL}/me`, {
        headers: getAuthorizationHeader(token)
    }).then( (response) => response.data.data);
}

export type PublicationListType = Array<{
    id: string,
    name: string,
    description: string,
    url: string,
    imageUrl: string
}>;

export function getUserPublication(token: OAuthToken, userId: string) {
    return axios.get(`${MEDIUM_API_BASE_URL}/users/${userId}/publications`, {
        headers: getAuthorizationHeader(token)
    }).then( (response) => response.data.data);
}

export type PubContribsListType = Array<{
    publicationId: string,
    userId: string,
    role: 'editor' | 'writer'
}>;

export function getPubContribs(token: OAuthToken, publicationId: string) {
    return axios.get(`${MEDIUM_API_BASE_URL}/publications/${publicationId}/contributors`, {
        headers: getAuthorizationHeader(token)
    }).then( (response) => response.data.data);
}