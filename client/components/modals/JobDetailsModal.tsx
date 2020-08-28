import React, { Component } from 'react';
import { Tab, Tabs, Modal } from 'react-bootstrap';

interface IDetailsModalProps {
  show: boolean;
  close: () => void;
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

class JobDetailsModal extends Component<IDetailsModalProps> {
  render() {
    const { selectedJob } = this.props;
    // must check if selectedJob is not null so we don't get a type error
    let company, title;
    if (selectedJob !== null) {
      company = selectedJob.company;
      title = selectedJob.title;
    }
    return (
      <Modal
        className="detailsModal"
        show={this.props.show}
        onHide={this.props.close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="detailsTitle">
              <h1>{company}</h1>
              <h4>{title}</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
      </Modal>
    );
  }
}

export default JobDetailsModal;
