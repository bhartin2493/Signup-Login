import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AuthLoginComponent from "./auth-login-component.jsx";
import AuthSignupComponent from "./auth-signup-component.jsx";

class AuthContainerPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidUpdate() {
  //   if (!this.props.isSignedIn) {
  //     this.props.history.push("/signin");
  //   }
  // }

  pushToDashboard = (isUserSignedIn) => {
    isUserSignedIn ? this.props.history.push("/dashboard") : null;
  };

  componentDidUpdate() {
    this.pushToDashboard(this.props.isSignedIn);
  }

  componentDidMount() {
    this.pushToDashboard(this.props.isSignedIn);
  }

  render() {
    console.log("Props:", this.props);
    return (
      <div className="main-component">
        {this.props.match.path == "/signup" ? (
          <AuthSignupComponent />
        ) : this.props.match.path == "/signin" ? (
          <AuthLoginComponent />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
}

export default withRouter(connect(mapStateToProps, null)(AuthContainerPage));
