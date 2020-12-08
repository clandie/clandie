import React, { Component } from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import InterviewCard from '../../utils/InterviewCard';
import _ from 'lodash';
import { IInterviews } from '../../constants/types';

interface IInterviewsProps {
  jobId?: number;
  allInterviews:
    | {
        _id: number;
        title: string;
        date: Date;
        time: Date;
        notes: string;
      }[]
    | null;
  getInterview: (jobId: number) => void;
  createInterview: (title: string, jobId: number) => void;
  updateInterview: (interviewObj: IInterviews | undefined) => void;
  deleteInterview: (interviewId: number) => void;
}

interface IInterviewsState {
  listOfInterviews:
    | {
        _id: number;
        title?: string;
        date?: Date;
        time?: Date;
        notes?: string;
      }[]
    | null;
  title: string;
}

class Interviews extends Component<IInterviewsProps, IInterviewsState> {
  constructor(props: IInterviewsProps) {
    super(props);
    this.state = {
      listOfInterviews: [],
      title: '',
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if(this.props.jobId) this.props.getInterview(this.props.jobId);

    this.setState({
      listOfInterviews: this.props.allInterviews,
    });
  }

  handleChange(e: any) {
    const { value } = e.target;
    this.setState({ title: value });
  }

  handleSave(e: any) {
    e.preventDefault();
    const { createInterview, jobId } = this.props;
    if (jobId) createInterview(this.state.title, jobId);
    this.setState({title: ''});
  }

  render() {
    // iterate over array of interviews to be rendered instead of rendering one InterviewCard
    const { allInterviews } = this.props;
    const interviews = [];
    const noDateInterviews = [];
    if (allInterviews) {
      for (let i = 0; i < allInterviews.length; i++) {
        console.log( 'DATE CREATED TO STORE TIME', new Date(`01 Jan 1970 ${allInterviews[i].time}`))
        let time = allInterviews[i].time;
        if(allInterviews[i].time) time = new Date(`01 Jan 1970 ${allInterviews[i].time}`);
        if(!allInterviews[i].date) noDateInterviews.push(
          <InterviewCard
              id={allInterviews[i]._id}
              title={allInterviews[i].title}
              date={allInterviews[i].date}
              time={time}
              notes={allInterviews[i].notes}
              allInterviews={this.props.allInterviews}
              updateInterview={this.props.updateInterview}
              deleteInterview={this.props.deleteInterview}
            ></InterviewCard>
        );
        else {
          interviews.push(
            <InterviewCard
              id={allInterviews[i]._id}
              title={allInterviews[i].title}
              date={allInterviews[i].date}
              time={time}
              notes={allInterviews[i].notes}
              allInterviews={this.props.allInterviews}
              updateInterview={this.props.updateInterview}
              deleteInterview={this.props.deleteInterview}
            ></InterviewCard>
          );
        }
      }
    }

    interviews.sort((a: JSX.Element, b: JSX.Element) => new Date(a.props.date).getTime() - new Date(b.props.date).getTime());
    const sortedInterviews = interviews.concat(noDateInterviews);

    return (
      <div className="interviewsTab">
        {sortedInterviews}
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
                      <Form.Control
                        type="text"
                        name="title"
                        value={this.state.title}
                        placeholder="eg. On-Site, Phone-Screening, Behavioral, etc."
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>
                  <Button
                    className="save-btn"
                    type="submit"
                    onClick={this.handleSave}
                  >
                    Save
                  </Button>
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
