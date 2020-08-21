import React, { Component } from 'react';
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';
import BoardCard from './BoardCard';

interface IModalProps {
  boards: { _id: number; name: string }[] | [];
  selectBoard: (id: number, name: string) => void;
  close: () => void;
  addBoard: (id: number, name: string) => void;
  show: boolean;
  user: string;
  userId: number;
}

interface IModalState {
  createName: string;
}

class BoardModal extends Component<IModalProps, IModalState> {
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
    const { boards, show, user, close } = this.props;
    const boardCards = [];
    for (let i = 0; i < boards.length; i++) {
      boardCards.push(
        <BoardCard
          key={boards[i]._id}
          id={boards[i]._id}
          name={boards[i].name}
          select={this.props.selectBoard}
        />
      );
    }

    // first time users will get a modal that asks them to create a board
    if (boards.length === 0) {
      return (
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
      );
    }

    return (
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
            Hello {user}! Here are your boards
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{boardCards}</Modal.Body>
      </Modal>
    );
  }
}

export default BoardModal;
