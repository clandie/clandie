import React, { Component } from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import ContactCard from '../../utils/ContactCard';
import { ContactState }from '../../constants/stateTypes'

interface IContactsProps {
  jobId?: number;
  getContact: (jobID: number) => void;
  createContact: (name: string, jobID: number) => void;
  allContacts: ContactState['contacts']
}
interface IContactsState {
    name: string,
    title: string | null,
    phone: string | null,
    email: string | null,
    notes: string | null,
}

class Contacts extends Component<IContactsProps, IContactsState> {
  constructor(props: IContactsProps) {
    super(props);
    this.state = {
      name: '',
      title: '',
      phone: '',
      email: '',
      notes: '',
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
    if (jobId) createContact(this.state.name, jobId)
    this.setState({name: ''})
  }

  render() {
    const {allContacts} = this.props;
    const contacts =[];
    if (allContacts) {
      for (let i = 0; i < allContacts.length; i++) {
        contacts.push(
          <ContactCard 
            eventKey={i}
            name={allContacts[i].name}
            title={allContacts[i].title}
            phone={allContacts[i].phone}
            email={allContacts[i].email}
            notes={allContacts[i].notes}
          />
        )
      }
    }
    return (
    <div className="contactsTab">
      {contacts}
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
