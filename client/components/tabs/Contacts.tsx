import React, { Component } from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

interface IContactsProps {

}
interface IContactsState {
    name?: string,
    title?: string,
    phone?: string,
    email?: string,
    notes?: string,
}

class Contacts extends Component<IContactsProps, IContactsState> {
  constructor(props: IContactsState) {
    super(props);
    this.state = {
      name: '',
      title: '',
      phone: '',
      email: '',
      notes: '',
      }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    console.log('here')
    this.setState({ [name] : value})
  }

  render() {
    return (
    <div className="contactsTab">
      <Accordion>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              +
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formTitle">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>
                  <Button
                    className="save-btn"
                    type="submit"
                    // onClick={this.handleSave}
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
export default Contacts;
