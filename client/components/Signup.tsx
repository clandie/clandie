// login component
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-img"></div>
      <div className="login-box">
        <Form className="login-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="login-btn">
            <Button variant="primary" type="submit" block>
              Signup
            </Button>
          </div>
        </Form>
        <Link to="/">Already have an account? Login here!</Link>
      </div>
    </div>
  );
};

export default Signup;
