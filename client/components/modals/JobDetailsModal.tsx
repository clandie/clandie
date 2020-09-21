import React, { Component } from 'react';
import { Tab, Tabs, Modal } from 'react-bootstrap';
import Details from '../tabs/Details';
import Interviews from '../tabs/Interviews';
import Contacts from '../tabs/Contacts';
import { IDetails } from '../../constants/types';

interface IDetailsModalProps {
  show: boolean;
  close: () => void;
  selectedJob: {
    _id: number;
    status: string;
    company: string;
    title: string;
    location: string;
    notes: string;
    salary: string;
    url: string;
  } | null;
  updateDetails: (detailsObj: IDetails, boardId: number) => void;
  boardId: number;
  deleteJob: (jobId: number, boardId: number) => void;
  getInterview: (jobId: number) => any;
}

class JobDetailsModal extends Component<IDetailsModalProps> {
  componentDidMount() {}

  render() {
    const { selectedJob } = this.props;
    // must check if selectedJob is not null so we don't get a type error
    let company, title, allInterviews;
    let jobId = null;
    if (selectedJob !== null) {
      company = selectedJob.company;
      title = selectedJob.title;
      allInterviews = this.props.getInterview(selectedJob._id);
      jobId = selectedJob._id;
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
            <Tab eventKey="details" title="Details">
              <Details
                updateDetails={this.props.updateDetails}
                selectedJob={selectedJob}
                boardId={this.props.boardId}
                deleteJob={this.props.deleteJob}
                close={this.props.close}
              />
            </Tab>
            <Tab eventKey="interviews" title="Interviews">
              <Interviews
                allInterviews={allInterviews}
                jobId={jobId}
                // getInterview={this.props.getInterview}
              />
            </Tab>
            <Tab eventKey="contacts" title="Contacts">
              <Contacts />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    );
  }
}

export default JobDetailsModal;
