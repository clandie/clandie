import React, { Component } from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import ContactCard from '../../utils/ContactCard';
import { ContactState }from '../../constants/stateTypes'
import { IContactInfo } from '../../constants/types';

interface IContactsProps {
  jobId?: number;
  getContact: (jobID: number) => void;
  createContact: (name: string, jobID: number) => void;
  updateContact: (contactInfo: IContactInfo) => void;
  deleteContact: (contactID: number) => void;
  allContacts: ContactState['contacts']
}
interface IContactsState {
    name: string,
}

class Contacts extends Component<IContactsProps, IContactsState> {
  constructor(props: IContactsProps) {
    super(props);
    this.state = {
      name: '',
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { jobId } = this.props;
    if (jobId) this.props.getContact(jobId)
  }

  handleChange(e: any) {
    const { value } = e.target;
    this.setState({ name : value})
  }

  handleSave(e: any) {
    e.preventDefault();
    const {createContact, jobId} = this.props;
    if (this.state.name && jobId) createContact(this.state.name, jobId)
    this.setState({name: ''})
  }

  render() {
    const { updateContact, deleteContact, allContacts} = this.props;
    const contacts =[];
    if (allContacts) {
      for (let i = 0; i < allContacts.length; i++) {
        contacts.push(
          <ContactCard 
            eventKey={i + 1}
            id={allContacts[i]._id}
            name={allContacts[i].name}
            title={allContacts[i].title}
            phone={allContacts[i].phone}
            email={allContacts[i].email}
            notes={allContacts[i].notes}
            updateContact={updateContact}
            deleteContact={deleteContact}
            allContacts={allContacts}
          />
        )
      }
    }
  
    return (
      <div className="contactsTab">
        <Accordion>
          {contacts}
          <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                +
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formTitle">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Form.Row>
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
export default Contacts;
