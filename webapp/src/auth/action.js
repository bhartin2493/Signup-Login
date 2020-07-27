import {
  USER_AUTHENTICATION_FAIL,
  USER_AUTHENTICATION_SUCCESS,
} from "./action-types.js";

import {
  API_USER_AUTHENTICATION,
  API_USER_CREATION,
  API_USER_LOGOUT,
} from "../config.js/api-url-config.js";

//Action dispatchers
export const userAuthenticationSuccess = () => ({
  type: USER_AUTHENTICATION_SUCCESS,
  status: true,
});
export const userAuthenticationFail = (data) => ({
  type: USER_AUTHENTICATION_FAIL,
  status: false,
  message: data,
});

export function isUserSignedIn() {
  var status = false;
  if (!!sessionStorage.getItem("c3Auth")) {
    var userLoggedIn = JSON.parse(sessionStorage.getItem("c3Auth"));
    if (userLoggedIn.status) {
      status = userLoggedIn.status;
    }
  }
  return status;
}

// Action creator to authenticate user
export function authenticate(requestData) {
  //   console.log("Data", requestData);
  return function (dispatch) {
    // if authentication is success, store it in a session otherwise delet the session
    return new Promise((resolve, reject) => {
      var accessToken = "";

      fetch(API_USER_AUTHENTICATION, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "content-type": "application/json",
        },
        mode: "cors",
      })
        .then(function (res) {
          accessToken = res.headers.get("x-access-token");
          return res.json();
        })
        .then(function (data) {
          if (data.status == "success") {
            var authStatus = {
              status: true,
              token: accessToken,
              email: requestData.email,
            };
            sessionStorage.setItem("c3Auth", JSON.stringify(authStatus));
            dispatch(userAuthenticationSuccess());
            resolve(true);
          } else {
            var authStatus = { status: false, token: "", email: "" };
            sessionStorage.setItem("c3Auth", JSON.stringify(authStatus));
            dispatch(userAuthenticationFail({ message: message }));
            resolve(data);
          }
        })
        .catch(function (err) {
          var authStatus = { status: false, token: "", email: "" };
          sessionStorage.setItem("c3Auth", JSON.stringify(authStatus));
          dispatch(userAuthenticationFail({ message: data.message }));
          resolve(data);
        });
    });
  };
}

// Action creator for logout
export function signout() {
  return function (dispatch) {
    // setTimeout(function () {
    return new Promise((resolve, reject) => {
      var authStatus = { status: false, token: "", email: "" };
      sessionStorage.setItem("c3Auth", JSON.stringify(authStatus));
      dispatch(userAuthenticationFail({ message: "Logging out" }));
      resolve({ message: "Logging out" });
    });

    // }, 500);
  };
}

export function createUser(requestData) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      // const urlOption = `/create`;
      const url = `${API_USER_CREATION}/create`;
      // api call to create user
      fetch(url, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "content-type": "application/json",
        },
        mode: "cors",
      })
        .then((response) => response.json())
        .then((dataReceived) => {
          // if status is error
          if (dataReceived.status == "error") {
            resolve(dataReceived);
          } else {
            resolve(dataReceived);
          }
          // if (response.status == 200) {
          //     resolve(true);
          // } else {
          //     resolve(false);
          // }
        })
        .catch((error) => {
          resolve(false);
        });
    });
  };
}
