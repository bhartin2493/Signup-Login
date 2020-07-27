//React/Redux modules
import React from "react";
import { Route } from "react-router-dom";
import DashboardComponent from "../src/dashboard/dashboard-component.jsx";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthContainerPage from "../src/auth/auth-container-page.jsx";

//The router component
class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="main">
        <div className="content-wraper">
          <div className="main-content">
            <Route path="/signin" component={() => <AuthContainerPage />} />
            <Route path="/signup" component={() => <AuthContainerPage />} />
            <Route
              exact
              path="/dashboard"
              component={() => <DashboardComponent />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RouterComponent);
