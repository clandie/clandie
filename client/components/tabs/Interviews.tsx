import React, { Component } from 'react';
import { Form /*Col, Button*/ } from 'react-bootstrap';
import { IInterviews } from '../../constants/types';

class Interviews extends Component {
  constructor(props: IInterviews) {
    super(props);
  }

  render() {
    return (
      <div className="interviewsTab">
        <Form>
          {/* <Form className="row">
            <Form className="label">Title</Form>
          </Form>
          <Form className="row">
            <Form className="label">Date</Form>
            <Form className="label">Time</Form>
          </Form>
          <Form className="row">Notes</Form> */}
        </Form>
      </div>
    );
  }
}
export default Interviews;
