import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

class Details extends Component {
  render() {
    return (
      <div className="detailsTab">
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Location" />
            </Form.Group>

            <Form.Group as={Col} controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text" placeholder="Salary" />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formUrl">
            <Form.Label>URL</Form.Label>
            <Form.Control type="text" placeholder="URL" />
          </Form.Group>
          <Button type="submit">Save</Button>
        </Form>
      </div>
    );
  }
}
export default Details;
