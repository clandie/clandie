// login component
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ISignupProps {
  addUser(userObj: ISignupState): void;
}
interface ISignupState {
  name?: string;
  email?: string;
  password?: string;
}

class Signup extends Component<ISignupProps, ISignupState> {
  constructor(props: ISignupProps) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  // update state on form change
  handleChange = (e: any): void => {
    console.log('in handleChange - e', e.target.name);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // create obj with user info then invoke addUser action
  handleSignup = (e: any): void => {
    e.preventDefault();
    console.log('pressed submit');
    const userObj: ISignupState = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    console.log('handleSU - userobj', userObj);
    this.props.addUser(userObj);
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="login-container">
        <div className="login-img"></div>
        <div className="login-box">
          <Form className="login-form">
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Name"
                value={name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={this.handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="login-btn">
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSignup}
                block
              >
                Signup
              </Button>
            </div>
          </Form>
          <Link to="/">Already have an account? Login here!</Link>
        </div>
      </div>
    );
  }
}

export default Signup;
