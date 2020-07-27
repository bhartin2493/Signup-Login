import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./auth.scss";

import { createUser } from "./action.js";

class AuthSignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      country: "",
      gender: "",
      phoneNumber: "",
      authError: false,
      errorMessage: "",
    };
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value }, () => {});
  };

  onCancelForm = () => {
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      country: "",
      gender: "",
      phoneNumber: "",
    });
  };

  onCreateAccount = () => {
    var userData = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      country: this.state.country,
      phoneNumber: this.state.phoneNumber,
    };
    this.props.createUser(userData).then((msgRcvd) => {
      setTimeout(() => {
        if (msgRcvd.message.status == 200) {
          console.log("props:", this.props);
          this.props.history.push("/signin");
        } else {
          console.log("Message in else received:", msgRcvd);
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
            <div className="signup-container-box">
              <form autoComplete="off" action="javascript:void(0);">
                <div className="form-fields m-t-3">
                  <h1>Signup!!</h1>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="First Name"
                      id="firstName"
                      required
                      value={this.state.firstName}
                      onChange={(event) => this.onInputChange(event)}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      id="lastName"
                      value={this.state.lastName}
                      onChange={(event) => this.onInputChange(event)}
                    />

                    <input
                      type="text"
                      placeholder="Email"
                      title="Please enter your email"
                      id="email"
                      required
                      //   className="form-control email"
                      value={this.state.email}
                      onChange={(event) => this.onInputChange(event)}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      title="Please enter your password"
                      id="password"
                      required
                      className="form-control password"
                      value={this.state.password}
                      onChange={(event) => this.onInputChange(event)}
                    />
                    <input
                      type="text"
                      placeholder="Gender"
                      id="gender"
                      value={this.state.gender}
                      onChange={(event) => this.onInputChange(event)}
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      id="country"
                      value={this.state.country}
                      onChange={(event) => this.onInputChange(event)}
                    />
                    <input
                      type="text"
                      placeholder="Contact Number"
                      id="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={(event) => this.onInputChange(event)}
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-buttons">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 p-r-0">
                      <button
                        className={
                          this.state.email != "" && this.state.password != ""
                            ? "btn btn-primary signup-btn"
                            : "btn btn-cancel disable-signup-btn"
                        }
                        id="signup-btn"
                        disabled={
                          this.state.email != "" && this.state.password != ""
                            ? false
                            : true
                        }
                        onClick={() => this.onCreateAccount()}
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
  createUser: (userData) => dispatch(createUser(userData)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthSignupComponent)
);
