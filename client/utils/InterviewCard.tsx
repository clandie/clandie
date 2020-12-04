import React, { Component } from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {IInterviews} from '../constants/types';


interface IInterviewCardProps {
  id: number;
  title: string;
  date: Date |null;
  time: Date | null;
  notes: string | null;
  allInterviews: {
    _id: number;
    title?: string;
    date?: Date;
    time?: Date;
    notes?: string;
  }[] | null;
  updateInterview: (interviewObj: IInterviews) => void;
  deleteInterview: (interviewId: number) => void;
}

interface IInterviewCardState {
  title?: string;
  date?: Date |null;
  time?: Date | null;
  notes?: string | null;
  allInterviews?: {
    _id: number;
    title?: string;
    date?: Date;
    time?: Date;
    notes?: string;
  }[] | null;
}

class InterviewCard extends Component<IInterviewCardProps, IInterviewCardState> {
  constructor(props: IInterviewCardProps){
    super(props);
    this.state = {
      title: '',
      date: null,
      time: null,
      notes: '',
      allInterviews: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount(){
    const { title, date, time, notes } = this.props;
    this.setState({title, date, time, notes});
  }

  componentDidUpdate(){
    if(this.state.allInterviews !== this.props.allInterviews){
      const { title, date, time, notes, allInterviews } = this.props;
      this.setState({ title, date, time, notes, allInterviews, });
    }
  }

  handleChange(e: any, name: string) {
    const value = e.target ? e.target.value : e;
    this.setState({ [name]: value });
  }

  handleSave(e: any){
    e.preventDefault();
    const { title, date, time, notes } = this.state;
    const interviewInfo = { _id: this.props.id, title, date, time, notes,};
    this.props.updateInterview(interviewInfo);
  }

  render(){
  return (
    <div className="interviewCard">
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          {this.props.title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <textarea 
                    className="interviewTitle"
                    name="title"
                    value={this.state.title ? this.state.title : ''}
                    onChange={(e: any) => this.handleChange(e, 'title')}
                  ></textarea>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formDate">
                  <Form.Label>Date</Form.Label>
                    <DatePicker
                      name="date"
                      className="interviewDate"
                      selected={this.state.date ? new Date(this.state.date): null}
                      onChange={(date: Date) => this.handleChange(date, 'date')}
                      dateFormat="MMMM d, yyyy"
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formTime">
                  <Form.Label>Time</Form.Label>
                  <DatePicker
                    name="time"
                    className="interviewTime"
                    selected={this.state.time}
                    onChange={(time: Date) => this.handleChange(time, 'time')}
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
                  <textarea 
                    className="interviewNotes"
                    name="notes"
                    value={this.state.notes ? this.state.notes : ''}
                    onChange={(e: any) => this.handleChange(e, 'notes')}
                  ></textarea>
                </Form.Group>
              </Form.Row>
              <Button 
                className="delete-btn"
                onClick={() => this.props.deleteInterview(this.props.id)}
              >Delete</Button>
              <Button
                className="save-btn"
                type="submit"
                onClick={this.handleSave}
              >Save</Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    </div>
  )};
};

export default InterviewCard;
