import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthContainerPage from "./auth/auth-container-page.jsx";
// import AuthLoginComponent from "./auth/auth-login-component.jsx;";
import DashboardComponent from "../src/dashboard/dashboard-component.jsx";
import thunk from "redux-thunk";

import authReducer from "../src/auth/reducer.js";
const reducer = combineReducers({
  auth: authReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/signin"
              component={() => <AuthContainerPage />}
            />
            <Route
              exact
              path="/dashboard"
              component={() => <DashboardComponent />}
            />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
