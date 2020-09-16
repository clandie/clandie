import React, { Component } from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import InterviewCard from '../../utils/InterviewCard';
// import DatePicker from 'react-bootstrap-date-picker';
// import { IInterviews } from '../../constants/types';
// import { ControlLabel } from 'react-bootstrap';
// console.log('react bootstrap date picker:', DatePicker);

interface IInterviewProps {
  jobId: number;
  allInterviews:
    | {
        _id: number;
        title: string;
        date: Date;
        time: Date;
        notes: string;
      }[]
    | [];
}

class Interviews extends Component {
  constructor(props: IInterviewProps) {
    super(props);
  }

  render() {
    // iterate over array of interviews to be rendered instead of rendering one InterviewCard

    return (
      <div className="interviewsTab">
        <InterviewCard
          title={'test'}
          date={new Date()}
          time={new Date()}
          notes={'hi'}
          jobId={1}
        />
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              +
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
      </div>
    );
  }
}
export default Interviews;
