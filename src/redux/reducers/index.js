import { combineReducers } from "redux";
import auth from './auth';

const data = (state = {
  isFetching: false,
  message: ""
}, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  data,
  auth
});

export default rootReducer;
