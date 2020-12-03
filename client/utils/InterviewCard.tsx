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
  saveDate: (date: Date, interviewId: number) => void;
  saveTime: (time: Date, interviewId: number) => void;
}

const InterviewCard = (props: IInterviewCardProps) => {
  console.log('props time from interview card: ', props.time)
  return (
    <div>
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
                  <Form.Label>Date</Form.Label>
                    <DatePicker
                      selected={new Date(props.date)}
                      onChange={(date: Date) => props.saveDate(date, props.id)}
                      dateFormat="MMMM d, yyyy"
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formTime">
                  <Form.Label>Time</Form.Label>
                  <DatePicker
                    selected={props.time}
                    onChange={(time: Date) => props.saveTime(time, props.id)}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="h:mm aa"
                    timeFormat="h:mm aa"
                    timeIntervals={15}
                  />
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
