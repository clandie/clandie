import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface IJobModalProps {
  show: boolean;
  close: () => void;
}
class CreateJobModal extends Component<IJobModalProps> {
  render() {
    const { show, close } = this.props;
    return (
      <Modal
        className="createJobModal"
        show={show}
        onHide={close}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Job
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="create-job-form">
            <Form.Group controlId="formBasicCompany">
              <Form.Control name="company" placeholder="Company" />
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Control name="title" placeholder="Job Title" />
            </Form.Group>
            <div className="save-job-btn">
              <Button
                className="save-btn"
                variant="primary"
                type="submit"
                block
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default CreateJobModal;
