import {
    loginAPI,
    registerAPI
} from '../../api/auth';

import {
	actionCreator, action
} from '../../utils';
import * as types from './actionTypes';

const authLoginSuccess = actionCreator(types.AUTH_LOGIN_SUCCESS);
const authLogin = actionCreator(types.AUTH_LOGIN);
const authLoginError = actionCreator(types.AUTH_LOGIN_ERROR);
const registerUser = actionCreator(types.REGISTER_USER);
const registerSuccess = actionCreator(types.REGISTER_USER_SUCCESS);
const registerError = actionCreator(types.REGISTER_USER_ERROR);

export const login = (user) => {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(authLogin({googleLogin: false, facebookLogin: false}));
        console.log(user, "in actions")
        loginAPI({...user}).then(res => {
            dispatch(authLoginSuccess());
        })
        .catch(err => {
            console.log(err, "err");
            dispatch(authLoginError({err: 'Server Encountered an Error'}));
        })
    });
};

export const register = (user) => {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(registerUser());
        console.log(user, "in actions")
        registerAPI({...user}).then(res => {
            dispatch(registerSuccess());
        })
        .catch(err => {
            console.log(err, "err");
            dispatch(registerError());
        })
    });
};

module.exports = {
    login,
    register
}