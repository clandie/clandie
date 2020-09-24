import React, { Component } from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import InterviewCard from '../../utils/InterviewCard';
// import DatePicker from 'react-bootstrap-date-picker';
// import { ControlLabel } from 'react-bootstrap';
// console.log('react bootstrap date picker:', DatePicker);

interface IInterviewsProps {
  // jobId: number | null;
  allInterviews:
    | {
        _id: number;
        title: string;
        date: Date;
        time: Date;
        notes: string;
      }[]
    | null;
}

interface IInterviewsState {
  listOfInterviews:
    | {
        _id: number;
        title: string;
        date: Date;
        time: Date;
        notes: string;
      }[]
    | null;
}

class Interviews extends Component<IInterviewsProps, IInterviewsState> {
  constructor(props: IInterviewsProps) {
    super(props);
    this.state = {
      listOfInterviews: [],
    };
  }

  componentDidMount() {
    const { allInterviews } = this.props;

    this.setState({
      listOfInterviews: allInterviews,
    });
  }

  render() {
    // iterate over array of interviews to be rendered instead of rendering one InterviewCard
    const { allInterviews } = this.props;
    const interviews = [];
    if (allInterviews) {
      for (let i = 0; i < allInterviews.length; i++) {
        interviews.push(
          <InterviewCard
            title={allInterviews[i].title}
            date={allInterviews[i].date}
            time={allInterviews[i].time}
            notes={allInterviews[i].notes}
            // jobId={allInterviews[i]._id}
          ></InterviewCard>
        );
      }
    }

    return (
      <div className="interviewsTab">
        {interviews}
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
