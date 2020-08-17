import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import BoardContainer from './containers/BoardContainer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/home">
            <BoardContainer />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
