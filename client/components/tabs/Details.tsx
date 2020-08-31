import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { IDetails } from '../../constants/types';

interface IDetailProps {
  updateDetails: (detailsObj: IDetails) => void;
  selectedJob: {
    _id: number;
    status: string;
    company: string;
    title: string;
    location: string | null;
    notes: string | null;
    salary: string | null;
    url: string | null;
  } | null;
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

  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSave(e: any) {
    e.preventDefault();
    const { selectedJob, updateDetails } = this.props;
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
      updateDetails(detailsObj);

      console.log('details', detailsObj);
    }
  }

  render() {
    return (
      <div className="detailsTab">
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Location"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                placeholder="Salary"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formUrl">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              name="url"
              placeholder="URL"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" onClick={this.handleSave}>
            Save
          </Button>
        </Form>
      </div>
    );
  }
}
export default Details;
