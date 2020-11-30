import React, { Component } from 'react';
import { Tab, Tabs, Modal } from 'react-bootstrap';
import Details from '../tabs/Details';
import Interviews from '../tabs/Interviews';
import Contacts from '../tabs/Contacts';
import { IDetails, ISelectedJob} from '../../constants/types';

interface IDetailsModalProps {
  show: boolean;
  close: () => void;
  selectedJob: ISelectedJob | null;
  updateDetails: (detailsObj: IDetails, boardId: number) => void;
  boardId: number;
  deleteJob: (jobId: number, boardId: number) => void;
  getInterview: (jobId: number) => void;
  createInterview: (title: string, jobId: number) => void;
  allInterviews: | {
    _id: number;
    title: string;
    date: Date;
    time: Date;
    notes: string;
  }[]
| null;
}

class JobDetailsModal extends Component<IDetailsModalProps> {
  render() {
    const { selectedJob } = this.props;
    // must check if selectedJob is not null so we don't get a type error
    let company, title, jobId;

    // let allInterviews = null;
    if (selectedJob !== null) {
      company = selectedJob.company;
      title = selectedJob.title;
      // allInterviews = selectedJob.interviews;
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
                allInterviews={this.props.allInterviews}
                getInterview={this.props.getInterview}
                createInterview={this.props.createInterview}
                jobId={jobId}
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
