import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Dispatch } from 'redux';

import Login from './components/Login';
import Signup from './components/Signup';
import BoardContainer from './containers/BoardContainer';
// import PrivateRoute from './components/PrivateRoute';
import * as actions from './actions/userActions';
import * as types from './constants/types';
import { TAppState } from './store';

const mapStateToProps = (store: TAppState) => ({
  authorized: store.users.authorized,
});

// ** type error when dispatch: Dispatch
const mapDispatchToProps = (dispatch: any) => ({
  addUser: (userObj: types.ISignupState) => {
    console.log('dispatched create user', userObj);
    dispatch(actions.addUser(userObj));
  },
  verifyUser: (userObj: types.ILoginState) => {
    console.log('dispatched verify user', userObj);
    dispatch(actions.verifyUser(userObj));
  },
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class App extends Component<Props> {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            {/* Switch back to PrivateRoute once JWT is set up */}
            <Route
              exact
              path="/home"
              component={BoardContainer}
              authorized={this.props.authorized}
            />
            <Route exact path="/signup">
              <Signup addUser={this.props.addUser} />
            </Route>
            <Route exact path="/">
              <Login
                verifyUser={this.props.verifyUser}
                authorized={this.props.authorized}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
