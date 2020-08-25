import React, { Component } from 'react';
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';

interface IModalProps {
  show: boolean;
  close: () => void;
  user: string;
  userId: number;
  addBoard: (id: number, name: string) => void;
}

interface IModalState {
  createName: string;
}

class CreateBoardModal extends Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);

    // only needed for when users create a board
    this.state = {
      createName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    this.setState({ createName: e.target.value });
  }
  handleSubmit(e: any) {
    const { addBoard, userId } = this.props;
    e.preventDefault();
    // * userId must be converted to a number since it is typed as a string, most likely because TAppState is typed any - will have to look into this
    addBoard(Number(userId), this.state.createName);
  }
  render() {
    const { show, close, user } = this.props;
    return (
      <div className="createBoard">
        <Modal
          className="boardModal"
          show={show}
          onHide={close}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Welcome {user}, create your first board!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="boardInput">
              <FormControl
                placeholder="Board Name"
                aria-label="Board Name"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Create
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CreateBoardModal;
