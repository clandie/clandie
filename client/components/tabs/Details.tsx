import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

interface IDetailProps {}
interface IDetailState {
  location?: string | null;
  salary?: string | null;
  url?: string | null;
}
class Details extends Component<IDetailProps, IDetailState> {
  constructor(props: IDetailProps) {
    super(props);

    this.state = {
      location: null,
      salary: null,
      url: null,
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
    const detailsObj: IDetailState = {
      location: this.state.location,
      salary: this.state.salary,
      url: this.state.url,
    };

    console.log('details', detailsObj);
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
