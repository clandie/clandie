// login component
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ILoginProps {
  verifyUser(userObj: ILoginState): void;
}

interface ILoginState {
  email?: string;
  password?: string;
}

class Login extends Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // update state on form change
  handleChange = (e: any): void => {
    console.log('in handleChange - e', e.target.name);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // create obj with user info then invoke addUser action
  handleLogin = (e: any): void => {
    e.preventDefault();
    console.log('pressed submit');
    const userObj: ILoginState = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log('handleLI - userobj', userObj);
    this.props.verifyUser(userObj);
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-img"></div>
        <div className="login-box">
          <Form className="login-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="login-btn">
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleLogin}
                block
              >
                Login
              </Button>
            </div>
          </Form>
          <Link to="/signup">Don't have an account? Sign up here!</Link>
        </div>
      </div>
    );
  }
}

export default Login;
