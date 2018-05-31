// @flow

export const MEDIUM_API_BASE_URL = 'http://localhost:8080/https://api.medium.com/v1';

export type UserProfileType = {
    id: string,
    username: string,
    name: string,
    url: string,
    imageUrl: string
};