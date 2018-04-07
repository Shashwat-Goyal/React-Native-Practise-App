import * as types from '../actions/actionTypes';
//import { saveSession, getSession } from '../../utils';

let authStore = {
	loading: false,
	err: '',
	signup_success: false,
	googleLogin: false,
	facebookLogin: false,
	accountVerified: false,
	passwordChanged: false
}

export default (state = authStore, action) => {

	switch(action.type) {
		case types.AUTH_LOGIN :
			return {...state, loading: !(action.payload.googleLogin || action.payload.facebookLogin), googleLogin: action.payload.googleLogin, facebookLogin: action.payload.facebookLogin}
		case types.AUTH_LOGIN_ERROR :
			return {...state, loading: false, err: action.payload.err, googleLogin:false, facebookLogin: false}
		case types.AUTH_LOGIN_SUCCESS :
			return {...state, loading: false, session: action.payload.session,  googleLogin:false, facebookLogin: false}
		case types.REGISTER_USER : 
			return {...state, loading: !(action.payload.googleLogin), googleLogin: action.payload.googleLogin}
		case types.REGISTER_USER_SUCCESS :
			return {...state, loading:false, signup_success: true, googleLogin: false}
		case types.REGISTER_USER_ERROR :
			return {...state, loading:false, err: action.payload.err, signup_success: false, googleLogin: false}
		default :
			return state
	}

}