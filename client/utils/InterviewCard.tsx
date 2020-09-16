import React from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

interface IInterviewCardProps {
  title: string;
  date: Date;
  time: Date;
  notes: string;
  jobId: number;
}

const InterviewCard = (props: IInterviewCardProps) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          {props.title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formDate">
                  {/* <ControlLabel>Date</ControlLabel> */}
                  {/* <DatePicker /> */}
                  <Form.Label>Date</Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formTime">
                  <Form.Label>Time</Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formNotes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
              </Form.Row>
              <Button>Delete</Button>
              <Button>Save</Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default InterviewCard;
