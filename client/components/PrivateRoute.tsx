import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import BoardContainer from '../containers/BoardContainer';

interface IPrivateProps {
  exact?: boolean | undefined;
  path: string;
  component?: React.ComponentType<any>;
  children?: any;
  authorized: boolean;
}
type Props = IPrivateProps;

class PrivateRoute extends Component<Props> {
  render() {
    const { component, authorized, ...rest } = this.props;

    // redirect to Board if authorized, otherwise redirect to signup
    return (
      <Route
        {...rest}
        render={(props) => {
          if (authorized === true) return <BoardContainer />;
          // below is more dynamic - if authed, we can take user to intended location, but something breaks
          // if (authorized === true) return <Component {...props} />;
          else if (authorized === false || authorized === null) return <Redirect to="/" />;
        }}
      />
    );
  }
}

export default PrivateRoute;
