import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Dispatch } from 'redux';

import Login from './components/Login';
import Signup from './components/Signup';
import BoardContainer from './containers/BoardContainer';
import * as actions from './actions/userActions';
import * as types from './constants/types';

// const mapStateToProps = (state) => ({});

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

type Props = ReturnType<typeof mapDispatchToProps>;

export const App: React.FC<Props> = (props) => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/home">
            <BoardContainer />
          </Route>
          <Route exact path="/signup">
            <Signup addUser={props.addUser} />
          </Route>
          <Route exact path="/">
            <Login verifyUser={props.verifyUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export const AppConnectedBindActionCreators = connect(
  null,
  mapDispatchToProps
)(App);
