import React from 'react';
import { Modal } from 'react-bootstrap';
import BoardCard from './BoardCard';

interface IModalProps {
  boards: { _id: number; name: string }[] | [];
  selectBoard: () => void;
  show: boolean;
}

const BoardModal = (props: IModalProps) => {
  const { boards, show } = props;
  const boardCards = [];
  for (let i = 0; i < boards.length; i++) {
    boardCards.push(
      <BoardCard name={boards[i].name} select={props.selectBoard} />
    );
  }
  console.log('bc', boardCards);
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Board
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{boardCards}</Modal.Body>
    </Modal>
  );
};

export default BoardModal;
