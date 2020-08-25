import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import BoardCard from './BoardCard';
import CreateBoardModal from './CreateBoardModal';

interface IModalProps {
  boards: { _id: number; name: string }[] | [];
  selectBoard: (id: number, name: string) => void;
  close: () => void;
  addBoard: (id: number, name: string) => void;
  show: boolean;
  user: string;
  userId: number;
}

class BoardModal extends Component<IModalProps> {
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
        <CreateBoardModal
          show={show}
          close={close}
          user={user}
          userId={this.props.userId}
          addBoard={this.props.addBoard}
        />
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
