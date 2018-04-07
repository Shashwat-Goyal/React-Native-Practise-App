import { AsyncStorage, Alert } from 'react-native';

import axios from 'axios';
import moment from 'moment';
/* import {
  API_URL
} from '../constants'; */
// partialed functions

// session function
const API_URL = 'http://aasastudios.com/';
//export const saveSession = partial(setObjectToLocal, 'session');
//export const deleteSession = partial(removeItem, 'session');
//export const getSession = partial(getObjectFromLocal , 'session');

// api functions

export const apiPost = partial(apiReq, 'post');
export const apiGet = partial(apiReq, 'get');
export const apiPut = partial(apiReq, 'put');
export const apiDelete = partial(apiReq, 'delete');

// create endpoints

export const postApi = partial(partial, apiPost);
export const getApi = partial(partial, apiGet);
export const deleteApi = partial(partial, apiDelete);
export const putApi = partial(partial, apiPut);

//

export const postApiWithToken = partial(appendParams, postApi);
export const getApiWithToken = partial(appendParams, getApi);
export const deleteApiWithToken = partial(appendParams, deleteApi);
export const putApiWithToken = partial(appendParams, putApi);

// partial actions

export const actionCreator = partial(partial, action)

export function appendParams (method, endPoint, params) {
  const urlString = params.join('/');
  return method(`${endPoint}${urlString}`);
}

export function apiReq (method, endPoint, data, headers = {}) {
  return new Promise ((res, rej) => {

    headers = {
      ...getHeaders(),
      ...headers
    }

    if(method == 'get') {
      data = {
        params: data,
        headers
      }
    }

    axios[method](API_URL + endPoint, data, {headers}).then((result) => {
      let {data} = result;
      return res(data);
    }).catch((err) => {
      return rej(err);
    });

  })
}

export function getHeaders () {
  return {
    'content-type': 'application/json',
    'Authorization': null/* isLoggedIn() */ /* returns null if not logged in */
  }  
}

/* Partilal utility to compose new functions */

export function partial(fn,...presetArgs) {
  return function partiallyApplied(...laterArgs){
    return fn( ...presetArgs, ...laterArgs );
  };
}

export function action (type, payload = null) {
  return {
    type,
    payload
  }
}

export function logOut () {
  return new Promise ((resolve, reject) => {
    deleteSession()
    resolve(true)
  })
}

export const isLoggedIn = (async () => {
	const user = await AsyncStorage.getItem('user');
	console.log(user, "user")
	return user;
})

/* export function setObjectToLocal(key, value) {
  if(window && window.localStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getObjectFromLocal (key)  {

  if(typeof window === 'undefined'){
    return null;
  }
  
  if(window && window.localStorage) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}

export function removeItem (key) {
  if(window && window.localStorage) {
    localStorage.removeItem(key);
  }
} */

export const showErrorAlert = (message) => {
  Alert.alert(
      'Error',
      message,
      [
        {text: 'Close', onPress: () => console.log('Close Pressed')},
      ],
      { cancelable: false }
    )
}