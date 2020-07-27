import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AuthLoginComponent from "./auth-login-component.jsx";
import AuthSignupComponent from "./auth-signup-component.jsx";

class AuthContainerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignup: false,
    };
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

  OnCreateNewAccount = () => {
    this.setState({
      isSignup: true,
    });
  };

  switchToLogin = (val) => {
    this.setState({ isSignup: false });
  };

  render() {
    console.log(
      "Props:",
      this.props,
      this.props.history.location.pathname == "/signup",
      this.props.history.location.pathname
    );
    return (
      <div className="main-component">
        {this.state.isSignup == true ? (
          <AuthSignupComponent switchToLogin={this.switchToLogin} />
        ) : (
          <AuthLoginComponent
            isSignup={this.state.isSignup}
            OnCreateNewAccount={this.OnCreateNewAccount}
          />
        )}
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
