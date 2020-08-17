import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Login from './components/Login';
import Signup from './components/Signup';
import BoardContainer from './containers/BoardContainer';
import * as actions from './actions/action';
import * as types from './constants/types';

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addUser: (userObj: types.ISignupState) => {
    console.log('dispatched create user');
    dispatch(actions.addUser(userObj));
  },
});

// const mapDispatchToProps = {
//   addUser: actions.addUser(userObj: types.ISignupState),
// };

// const connector = connect(null, dispatchProps);
// type Props = ConnectedProps<typeof connector>;
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
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

// export default connector(App);
export const AppConnectedBindActionCreators = connect(
  null,
  mapDispatchToProps
)(App);
