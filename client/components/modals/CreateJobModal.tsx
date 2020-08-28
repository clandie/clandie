import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { IJobInput } from '../../constants/types';

interface IJobModalProps {
  show: boolean;
  column: string | null;
  boardId: number;
  createJob: (jobObj: IJobInput) => void;
  close: () => void;
}

interface IJobModalState {
  company?: string;
  title?: string;
}
class CreateJobModal extends Component<IJobModalProps, IJobModalState> {
  constructor(props: IJobModalProps) {
    super(props);

    this.state = {
      company: '',
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSave(e: any) {
    e.preventDefault();
    const jobObj: IJobInput = {
      status: this.props.column,
      company: this.state.company,
      title: this.state.title,
      board_id: this.props.boardId,
    };
    this.props.createJob(jobObj);
    this.props.close();
  }

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
              <Form.Control
                name="company"
                placeholder="Company"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
              <Form.Control
                name="title"
                placeholder="Job Title"
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="save-job-btn">
              <Button
                className="save-btn"
                variant="primary"
                type="submit"
                onClick={this.handleSave}
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
