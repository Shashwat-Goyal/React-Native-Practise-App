import { combineReducers } from "redux";

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
  data
});

export default rootReducer;
