// login component
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-img"></div>
      <div className="login-box">
        <Form className="login-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="login-btn">
            <Button variant="primary" type="submit" block>
              Login
            </Button>
          </div>
        </Form>
        <Link to="/signup">Don't have an account? Sign up here!</Link>
      </div>
    </div>
  );
};

export default Login;
