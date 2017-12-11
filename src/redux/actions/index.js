export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const requestData = () => {
  return {
    type: REQUEST_DATA
  };
};

export const receiveData = (data) => {
  return {
    type: RECEIVE_DATA,
    data
  };
};

const fetchData = () => {
  console.log("action called")
  return (dispatch) => {
    dispatch(requestData());
    return setTimeout(() => {
      const data = {message: "Hello"};
      dispatch(receiveData(data));
    }, 300);
  };
};

module.exports = {
  fetchData
}