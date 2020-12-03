import React, { Component } from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {IInterviews} from '../constants/types'


interface IInterviewCardProps {
  id: number;
  title: string;
  date: Date |null;
  time: Date | null;
  notes: string | null;
  saveDate: (date: Date, interviewId: number) => void;
  saveTime: (time: Date, interviewId: number) => void;
  updateInterview: (interviewObj: IInterviews) => void;
  deleteInterview: (interviewId: number) => void;
}

interface IInterviewCardState {
  title?: string;
  date?: Date |null;
  time?: Date | null;
  notes?: string | null;
}

class InterviewCard extends Component<IInterviewCardProps, IInterviewCardState> {
  constructor(props: IInterviewCardProps){
    super(props);
    this.state = {
      title: '',
      date: null,
      time: null,
      notes: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount(){
    const { title, date, time, notes } = this.props;
    this.setState({title, date, time, notes});
  }

  handleChange(e: any) {
    const { name, value } = e.target;
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
    <div>
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
                    onChange={this.handleChange}
                  ></textarea>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formDate">
                  <Form.Label>Date</Form.Label>
                    <DatePicker
                      selected={this.props.date ? new Date(this.props.date): null}
                      onChange={(date: Date) => this.props.saveDate(date, this.props.id)}
                      dateFormat="MMMM d, yyyy"
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formTime">
                  <Form.Label>Time</Form.Label>
                  <DatePicker
                    selected={this.props.time}
                    onChange={(time: Date) => this.props.saveTime(time, this.props.id)}
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
                    onChange={this.handleChange}
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
