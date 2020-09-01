import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { IDetails } from '../../constants/types';

interface IDetailProps {
  updateDetails: (detailsObj: IDetails, boardId: number) => void;
  selectedJob: {
    _id: number;
    status: string;
    company: string;
    title: string;
    location: string;
    notes: string;
    salary: string;
    url: string;
  } | null;
  boardId: number;
  deleteJob: (jobId: number, boardId: number) => void;
  close: () => void;
}
interface IDetailState {
  // company?: string;
  // title?: string;
  location?: string;
  salary?: string;
  url?: string;
  notes?: string;
}
class Details extends Component<IDetailProps, IDetailState> {
  constructor(props: IDetailProps) {
    super(props);

    this.state = {
      // company: '',
      // title: '',
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
              <Form.Control
                type="text"
                name="location"
                placeholder={this.state.location}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                placeholder={this.state.salary}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formUrl">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              name="url"
              placeholder={this.state.url}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              placeholder={this.state.notes}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" onClick={this.handleSave}>
            Save
          </Button>
          <Button
            className="delete"
            onClick={() => {
              deleteJob(jobId, boardId);
              close();
            }}
          >
            Delete
          </Button>
        </Form>
      </div>
    );
  }
}
export default Details;
