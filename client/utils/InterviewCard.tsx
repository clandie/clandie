import React from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface IInterviewCardProps {
  id: number;
  title: string;
  date: Date;
  time: Date;
  notes: string;
  saveDate: (e: any, interviewid: number) => void;
  // jobId: number;
}

const InterviewCard = (props: IInterviewCardProps) => {
  console.log('props.date rom interviewCard', props.date)
  return (
    <div>
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          {props.title}
          {/* <Button>Trash</Button> */}
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
                  <Form.Label>Date</Form.Label>
                  {'/n'}
                    <DatePicker selected={props.date} onChange={(date) => {props.saveDate(date, props.id)}}/>
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
    </div>
  );
};

export default InterviewCard;
