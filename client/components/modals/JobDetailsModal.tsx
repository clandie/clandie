import React, { Component } from 'react';
import { Tab, Tabs, Modal } from 'react-bootstrap';

interface IDetailsModalProps {
  show: boolean;
}

class JobDetailsModal extends Component<IDetailsModalProps> {
  render() {
    return (
      <Modal
        className="detailsModal"
        show={this.props.show}
        // onHide={close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="detailsTitle">
              <h1>Company</h1>
              <h4>Title</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="jobDetailsModal"> */}

          <Tabs id="details-tab">
            <Tab eventKey="details" title="Details"></Tab>
            <Tab eventKey="interviews" title="Interviews"></Tab>
            <Tab eventKey="contacts" title="Contacts"></Tab>
          </Tabs>
          <div className="detailsNotes">
            <h4>Notes</h4>
            <input className="notesSections"></input>
          </div>
        </Modal.Body>
        {/* </div> */}
      </Modal>
    );
  }
}

export default JobDetailsModal;
