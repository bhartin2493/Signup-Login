import {
  USER_AUTHENTICATION_FAIL,
  USER_AUTHENTICATION_SUCCESS,
} from "./action-types.js";

let defaultStatus = false;
let accessToken = null;
if (!!sessionStorage.getItem("c3Auth")) {
  let userLoggedIn = JSON.parse(sessionStorage.getItem("c3Auth"));
  if (userLoggedIn.status) {
    defaultStatus = userLoggedIn.status;
    accessToken = JSON.parse(sessionStorage.getItem("c3Auth")).token;
  }
}
// Default initial state, all set to false or null
const initialState = {
  isSignedIn: defaultStatus,
  authToken: accessToken,
};

// Change the state based on the actions
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        isSignedIn: action.status,
        authToken: action.token,
      });
    case USER_AUTHENTICATION_FAIL:
      return Object.assign({}, state, {
        isSignedIn: action.status,
        authToken: action.token,
      });
    default:
      return state;
  }
};

export default authReducer;
