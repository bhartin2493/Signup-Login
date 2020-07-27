/**
 * Dashboard Component
 *
 * Author - Manmath
 */

import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//Redux authentication action
import { signout } from "../auth/action.js";
class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  userLogout() {
    this.props.signout().then((done) => {
      if (done) {
        this.props.history.push("/signin");
      }
    });
  }

  render() {
    return (
      <div className="dashboard-component">
        <div className="dashboard-head border-b pt30 pb30">
          <h3>Welcome !!</h3>
          <button type="btn btn-cancel" onClick={() => this.userLogout()}>
            Signout
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSignedIn: state.auth.isSignedIn, //check if user is already loggedin
  };
}

//Connector to redux actions
function mapDispatchToProps(dispatch) {
  return {
    signout: () => dispatch(signout()),

    // redux action for signout, this will remove the session
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)
);
