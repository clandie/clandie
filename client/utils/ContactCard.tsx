import React, { Component } from 'react';
import { Form, Col, Button, Card, Alert } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { IContactInfo } from '../constants/types';
import { ContactState }from '../constants/stateTypes'

interface IContactCardProps {
  eventKey: number;
  id: number;
  name: string;
  title: string | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
  updateContact: (contactInfo: IContactInfo) => void;
  deleteContact: (contactID: number) => void;
  allContacts: ContactState['contacts'];
}

interface IContactCardState {
  name?: string;
  title?: string | null;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
  allContacts?: ContactState['contacts'] | [];
  saved?: boolean;
}

class ContactCard extends Component<IContactCardProps, IContactCardState> {
  constructor(props: IContactCardProps) {
    super(props);
    this.state = {
      name: '',
      title: '',
      phone: '',
      email: '',
      notes: '',
      allContacts: [],
      saved: false,
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    // populate fields with contact info
    console.log('this card props', this.props)
    const { name, title, phone, email, notes, allContacts } = this.props;
    this.setState({ name, title, phone, email, notes, allContacts });
  }

  // update ui of cards once contact data is updated in db
  componentDidUpdate() {
    if (this.state.allContacts !== this.props.allContacts) {
      const { name, title, phone, email, notes, allContacts } = this.props;
      this.setState({ name, title, phone, email, notes, allContacts })
    }
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name] : value})
  }

  handleSave(e: any) {
    e.preventDefault();
    const { name, title, phone, email, notes } = this.state;
      if (name) {
        const contactInfo = {
          name,
          title,
          phone,
          email,
          notes,
          contactID: this.props.id
        };
        this.props.updateContact(contactInfo);
      }
    this.setState({ saved: true })
  }

  successAlert() {
    if (this.state.saved === true) {
      return (
        <Alert variant="success" className="successAlert">Success! Your contact has been saved.</Alert>
      )
    } 
  }

  render() {
    const { eventKey, name, title, phone, email, deleteContact } = this.props;
      // display phone number, else display email
      let headerContact;
      if (phone) {
        headerContact = phone
      } else {
        headerContact = email
      }
    return (
      <Card className="contactCard">
        <Accordion.Toggle as={Card.Header} eventKey={eventKey.toString()}>
          {name}
          <span id="headerTitle">{title}</span>
          <span id="headerContact">{headerContact}</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={eventKey.toString()}>
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formContactName">
                  <Form.Label>Name</Form.Label>
                    <textarea 
                      className="contactName" 
                      name="name" 
                      value={this.state.name ? this.state.name : ''}
                      onChange={this.handleChange}
                    ></textarea>
                </Form.Group>
                <Form.Group as={Col} controlId="formContactTitle">
                  <Form.Label>Title</Form.Label>
                  <textarea 
                    className="contactTitle" 
                    name="title" 
                    value={this.state.title ? this.state.title : ''}
                    onChange={this.handleChange}
                  ></textarea>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formContactPhone">
                  <Form.Label>Phone</Form.Label>
                  <textarea 
                    className="contactPhone" 
                    name="phone" 
                    value={this.state.phone ? this.state.phone : ''}
                    onChange={this.handleChange}
                  ></textarea>
                </Form.Group>
                <Form.Group as={Col} controlId="formContactEmail">
                  <Form.Label>Email</Form.Label>
                  <textarea 
                    className="contactEmail" 
                    name="email" 
                    value={this.state.email ? this.state.email : ''}
                    onChange={this.handleChange}
                  ></textarea>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formContactNotes">
                <Form.Label>Notes</Form.Label>
                <textarea 
                  className="contactNotes" 
                  name="notes" 
                  value={this.state.notes ? this.state.notes : ''}
                  onChange={this.handleChange}
                ></textarea>
              </Form.Group>
              {this.successAlert()}
              <Button
                className="delete-btn"
                onClick={() => deleteContact(this.props.id)}
              >
                Delete
              </Button>
              <Button className="save-btn" type="submit" onClick={this.handleSave}>
                Save
              </Button>
          </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}

export default ContactCard;