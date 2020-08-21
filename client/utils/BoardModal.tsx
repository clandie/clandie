import React from 'react';
import { Modal } from 'react-bootstrap';
import BoardCard from './BoardCard';

interface IModalProps {
  boards: { _id: number; name: string }[] | [];
  selectBoard: (id: number, name: string) => void;
  show: boolean;
  user: string;
}

const BoardModal = (props: IModalProps) => {
  const { boards, show, user } = props;
  const boardCards = [];
  for (let i = 0; i < boards.length; i++) {
    boardCards.push(
      <BoardCard
        key={boards[i]._id}
        id={boards[i]._id}
        name={boards[i].name}
        select={props.selectBoard}
      />
    );
  }

  return (
    <Modal
      className="boardModal"
      show={show}
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
};

export default BoardModal;
