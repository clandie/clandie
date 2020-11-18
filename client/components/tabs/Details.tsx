import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { IDetails, ISelectedJob } from '../../constants/types';

interface IDetailProps {
  updateDetails: (detailsObj: IDetails, boardId: number) => void;
  selectedJob: ISelectedJob | null;
  boardId: number;
  deleteJob: (jobId: number, boardId: number) => void;
  close: () => void;
}
interface IDetailState {
  location?: string;
  salary?: string;
  url?: string;
  notes?: string;
}
class Details extends Component<IDetailProps, IDetailState> {
  constructor(props: IDetailProps) {
    super(props);

    this.state = {
      location: '',
      salary: '',
      url: '',
      notes: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { selectedJob } = this.props;

    if (selectedJob !== null) {
      this.setState({
        location: selectedJob.location,
        salary: selectedJob.salary,
        url: selectedJob.url,
        notes: selectedJob.notes,
      });
    }
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSave(e: any) {
    e.preventDefault();
    const { selectedJob, updateDetails, boardId } = this.props;
    if (selectedJob !== null) {
      const detailsObj: IDetails = {
        status: selectedJob.status,
        company: selectedJob.company,
        title: selectedJob.title,
        location: this.state.location,
        salary: this.state.salary,
        url: this.state.url,
        notes: this.state.notes,
        jobId: selectedJob._id,
      };
      updateDetails(detailsObj, boardId);
    }
  }

  //* replaced form control with html text area - we may not even need forms for this tab
  render() {
    const { selectedJob, boardId, deleteJob, close } = this.props;
    let jobId: number;
    if (selectedJob !== null) jobId = selectedJob._id;
    return (
      <div className="detailsTab">
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <textarea className="detailsLocation" onChange={this.handleChange} name="location" value={this.state.location ? this.state.location : ''}></textarea>
            </Form.Group>
            <Form.Group as={Col} controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <textarea className="detailsSalary" onChange={this.handleChange} name="salary" value={this.state.salary ? this.state.salary : ''}></textarea>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formUrl">
            <Form.Label>URL</Form.Label>
            <textarea className="detailsUrl" onChange={this.handleChange} name="url" value={this.state.url ? this.state.url : ''}></textarea>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Notes</Form.Label>
            <textarea className="detailsNotes" onChange={this.handleChange} name="notes" value={this.state.notes ? this.state.notes : ''}></textarea>
          </Form.Group>
          <Button
            className="delete-btn"
            onClick={() => {
              deleteJob(jobId, boardId);
              close();
            }}
          >
            Delete
          </Button>
          <Button className="save-btn" type="submit" onClick={this.handleSave}>
            Save
          </Button>
        </Form>
      </div>
    );
  }
}
export default Details;
