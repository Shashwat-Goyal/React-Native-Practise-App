import {
    postApi,
    getApi
} from '../utils';

export const loginAPI = postApi('/login');
export const registerAPI = postApi('/register');