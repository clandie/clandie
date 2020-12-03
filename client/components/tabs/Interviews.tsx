import React, { Component } from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import InterviewCard from '../../utils/InterviewCard';
import _ from 'lodash';
import { IInterviews } from '../../constants/types';
// import {IInterviews} from '../../constants/types';
// import DatePicker from 'react-bootstrap-date-picker';
// import { ControlLabel } from 'react-bootstrap';
// console.log('react bootstrap date picker:', DatePicker);
// import DatePicker from 'react-datepicker';

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
  // newInterviewInput: {
    title: string;
    // date?: Date | null;
    // time?: Date | null;
    // notes?: string;
  // };
}

class Interviews extends Component<IInterviewsProps, IInterviewsState> {
  constructor(props: IInterviewsProps) {
    super(props);
    this.state = {
      listOfInterviews: [],
      // newInterviewInput: {
        title: '',
        // date: null,
        // time: null,
        // notes: '',
      // },
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveDate = this.saveDate.bind(this);
    this.saveTime = this.saveTime.bind(this);
  }

  componentDidMount() {
    if(this.props.jobId) this.props.getInterview(this.props.jobId);

    this.setState({
      listOfInterviews: this.props.allInterviews,
    });
  }

  handleChange(e: any) {
    // const { name, value } = e.target;

    // const newInterviewInput = Object.assign(this.state.newInterviewInput);
    // newInterviewInput[name] = value;
    // this.setState({
    //   newInterviewInput,
    // });

    const { value } = e.target;
    this.setState({ title: value });
  }

  handleSave(e: any) {
    e.preventDefault();
    const { createInterview, jobId } = this.props;
    if (jobId) createInterview(this.state.title, jobId);

    // const stateCopy = _.cloneDeep(this.state);
    // stateCopy.title = '';
    // console.log(stateCopy)
    this.setState({title: ''});
    console.log('state fron interviews after setstate: ', this.state)
  }

  saveDate(date: Date, interviewId: number) {
    const propsClone = _.cloneDeep(this.props);
    const interviews = propsClone.allInterviews;

    let interviewToUpdate;
    const newInterviews = [];
    if(interviews){
      for(let i = 0; i < interviews.length; i++){
        console.log(interviewId, interviews[i]._id)
        if(interviews[i]._id === interviewId) {
          interviews[i].date = date;
          if(interviews[i].time) interviews[i].time = new Date(`01 Jan 1970 ${interviews[i].time}`);
          interviewToUpdate = interviews[i];
        }
        newInterviews.push(interviews[i]);
      }
    }

    this.props.updateInterview(interviewToUpdate);
    
    this.setState({
      ...this.state,
      listOfInterviews: newInterviews
    })
  }

  saveTime(time: Date, interviewId: number) {
    const propsClone = _.cloneDeep(this.props);
    const interviews = propsClone.allInterviews;

    let interviewToUpdate;
    const newInterviews = [];
    if(interviews){
      for(let i = 0; i < interviews.length; i++){
        if(interviews[i]._id === interviewId){
          interviews[i].time = time;
          interviewToUpdate = interviews[i];
        }
        newInterviews.push(interviews[i]);
      }
    }

    this.props.updateInterview(interviewToUpdate);

    this.setState({
      ...this.state,
      listOfInterviews: newInterviews
    });
  }

  render() {
    // iterate over array of interviews to be rendered instead of rendering one InterviewCard
    const { allInterviews } = this.props;
    const interviews = [];
    if (allInterviews) {
      for (let i = 0; i < allInterviews.length; i++) {
        let time = allInterviews[i].time;
        if(allInterviews[i].time) time = new Date(`01 Jan 1970 ${allInterviews[i].time}`);

        interviews.push(
          <InterviewCard
            id={allInterviews[i]._id}
            title={allInterviews[i].title}
            date={allInterviews[i].date}
            time={time}
            notes={allInterviews[i].notes}
            saveDate={this.saveDate}
            saveTime={this.saveTime}
          ></InterviewCard>
        );
      }
    }

    interviews.sort((a: JSX.Element, b: JSX.Element) => new Date(a.props.date).getTime() - new Date(b.props.date).getTime());

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
                      <Form.Control
                        type="text"
                        name="title"
                        value={this.state.title}
                        placeholder="eg. On-Site, Phone-Screening, Behavioral, etc."
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>
                  {/* <Form.Row>
                    <Form.Group as={Col} controlId="formDate">
                      <Form.Label>Date</Form.Label>
                      <Form.Control>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formTime">
                      <Form.Label>Time</Form.Label>
                      <Form.Control></Form.Control>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formNotes">
                      <Form.Label>Notes</Form.Label>
                      <Form.Control
                        type="text"
                        name="notes"
                        placeholder={this.state.newInterviewInput.notes}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row> */}
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
