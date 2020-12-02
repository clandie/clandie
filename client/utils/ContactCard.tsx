import React from 'react';
import { Form, Col, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

interface IContactCardProps {

}

const ContactCard = (props: IContactCardProps) => {
  return (
    <div className="contactCard">
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Clara Kim
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formContactName">
                    <Form.Label>Name</Form.Label>
                      <textarea className="contactName" name="name"></textarea>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formContactTitle">
                    <Form.Label>Title</Form.Label>
                    <textarea className="contactTitle" name="title"></textarea>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formContactPhone">
                    <Form.Label>Phone</Form.Label>
                    <textarea className="contactPhone" name="phone"></textarea>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formContactEmail">
                    <Form.Label>Email</Form.Label>
                    <textarea className="contactEmail" name="email"></textarea>
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="formContactNotes">
                  <Form.Label>Notes</Form.Label>
                  <textarea className="contactNotes" name="notes"></textarea>
                </Form.Group>
                <Button
                  className="delete-btn"
                >
                  Delete
                </Button>
                <Button className="save-btn" type="submit">
                  Save
                </Button>
             </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

export default ContactCard;