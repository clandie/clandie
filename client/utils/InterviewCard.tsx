import React, { Component } from 'react';
import { Form, Col, Button, Card, Alert } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import {IInterviews} from '../constants/types';

// need to use let in order for dayjs plugins to work properly
let dayjs = require('dayjs');
let utc = require('dayjs/plugin/utc'); // dependent on utc plugin
let timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const timezones = {
  'PST (Pacific Standard Time)': 'America/Los_Angeles',
  'EST (Eastern Standard Time)': 'America/New_York',
  'CST (Central Standard Time)': 'America/Chicago',
  'MST (Mountain Standard Time)': 'America/Phoenix',
  // 'AEST (Australia Eastern Standard Time)': 'GMT+11:00',
  // 'ACST (Australia Central Standard Time)': 'ACST',
  // 'AKST (Alaska Standard Time)': 'AKST',
  // 'AST (Atlantic Standard Time)': 'AST',
  // 'AWST (Australia Western Standard Time)': 'AWST',
  // 'CAT (Central Africa Time)': 'CAT',
  // 'CET (Central European Time)': 'CET',
  // 'EAT (East Africa Time)': 'EAT',
  // 'EET (Eastern European Time)': 'EET',
  // 'MSK (Moscow Standard Time)': 'MSK',
  // 'WAT (West Africa Time)': 'WAT',
  // 'WET (Western European Time)': 'WET',
};

interface IInterviewCardProps {
  id: number;
  title: string;
  date: Date |null;
  time: Date | null;
  timezone: string | null
  notes: string | null;
  allInterviews: {
    _id: number;
    title?: string;
    date?: Date;
    time?: Date;
    timezone?: string;
    notes?: string;
  }[] | null;
  updateInterview: (interviewObj: IInterviews) => void;
  deleteInterview: (interviewId: number) => void;
}

interface IInterviewCardState {
  id?: number | null;
  title?: string;
  date?: Date |null;
  time?: Date | null;
  timezone?: string | null;
  notes?: string | null;
  allInterviews?: {
    _id: number;
    title?: string;
    date?: Date;
    time?: Date;
    timezone?: string;
    notes?: string;
  }[] | null;
  saved?: boolean;
}

class InterviewCard extends Component<IInterviewCardProps, IInterviewCardState> {
  constructor(props: IInterviewCardProps){
    super(props);
    this.state = {
      id: null,
      title: '',
      date: null,
      time: null,
      timezone: null,
      notes: '',
      allInterviews: [],
      saved: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.successAlert = this.successAlert.bind(this);
  }

  componentDidMount(){
    const { id, title, date, time, timezone, notes, allInterviews } = this.props;
    let tzTime = time;
    if(time && timezone) tzTime = dayjs(time).tz(timezone).toDate();
    this.setState({id, title, date, time: tzTime, timezone, notes, allInterviews, });
  }
  
  componentDidUpdate(){
    if(this.state.allInterviews !== this.props.allInterviews){
      const { title, date, time, timezone, notes, allInterviews } = this.props;
      // convert time to proper timezone from utc
      let tzTime = time;
      if(time){
        const utcTime = dayjs(time).utc(true).format();
         tzTime = new Date(dayjs(utcTime).tz(timezone).format('MM-DD-YYYY HH:mm:ss'));
      }
      this.setState({ title, date, time: tzTime, timezone, notes, allInterviews, });
    }
  }

  handleChange(e: any, name: string) {
    const value = e.target ? e.target.value : e;
    this.setState({ [name]: value });
  }

  handleSave(e: any){
    e.preventDefault();
    const { title, date, time, timezone, notes } = this.state;
    // convert time to utc before adding to db
    let utcTime = time;
    if(time){
      const tzTime = dayjs(time).tz(timezone, true).format();
      utcTime = dayjs(tzTime).utc().format();
    }
    
    const interviewInfo = { _id: this.props.id, title, date, time: utcTime, timezone, notes,};
    this.props.updateInterview(interviewInfo);
    this.setState({ saved: true })
  }

  successAlert() {
    if (this.state.saved === true) {
      return (
        <Alert variant="success" className="successAlert">Success! Your interview has been saved.</Alert>
      )
    } 
  }

  render(){
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const date = this.props.date ? new Date(this.props.date).toLocaleDateString('en-US', dateOptions) : null;

  return (
    <div className="interviewCard">
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          {this.props.title}
          <span id="interviewHeaderDate">{date}</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <br />
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
                    <Form.Label className="timeSelectionFlex">Time</Form.Label>
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
                      <TimezonePicker 
                        className="interviewTimezone"
                        placeholder="select timezone"
                        value={this.state.timezone}
                        timezones={timezones}
                        onChange={(timezone: string) => this.handleChange(timezone, 'timezone')}
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
                {this.successAlert()}
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
