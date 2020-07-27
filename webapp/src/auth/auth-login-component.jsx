import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./auth.scss";

import { authenticate } from "./action.js";

class AuthLoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value }, () => {
      console.log("Email", this.state.email);
    });
  };

  onCancelForm = () => {
    this.setState({
      email: "",
      password: "",
    });
  };

  OnCreateNewAccount = () => {
    this.props.history.push("/signup");
  };

  onSubmitForm = () => {
    var userData = { email: this.state.email, password: this.state.password };
    this.props.authenticate(userData).then((msgRcvd) => {
      //If authentication is success, reload the page.
      setTimeout(() => {
        if (msgRcvd == true && this.props.isSignedIn) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({
            authError: true,
            errorMessage: msgRcvd.message,
          });
        }
      }, 1000);
    });
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="row login-class">
          <div className="container-box">
            <div className="login-container-box">
              <form autoComplete="off" action="javascript:void(0);">
                <div className="form-fields m-t-3">
                  <div className="form-group">
                    <label htmlFor="email" className="animated-label">
                      Email
                    </label>
                    <input
                      type="text"
                      title="Please enter your email"
                      id="email"
                      required
                      //   className="form-control email"
                      value={this.state.email}
                      onChange={(event) => this.onInputChange(event)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="animated-label">
                      Password
                    </label>
                    <input
                      type="password"
                      title="Please enter your password"
                      id="password"
                      required
                      className="form-control password"
                      value={this.state.password}
                      onChange={(event) => this.onInputChange(event)}
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-buttons">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 p-r-0">
                      <button
                        className="btn btn-primary signin-btn"
                        id="login-btn"
                        onClick={() => this.onSubmitForm()}
                      >
                        Login
                      </button>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 p-r-0">
                      <button
                        className="btn btn-secondary cancel-btn"
                        onClick={(event) => this.OnCreateNewAccount(event)}
                      >
                        Create an account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
}

const mapDispatchToProps = (dispatch) => ({
  authenticate: (userData) => dispatch(authenticate(userData)),
});
// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(AuthLoginComponent)
// );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthLoginComponent)
);
