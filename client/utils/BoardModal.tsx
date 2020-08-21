import React from 'react';
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';
import BoardCard from './BoardCard';

interface IModalProps {
  boards: { _id: number; name: string }[] | [];
  selectBoard: (id: number, name: string) => void;
  close: () => void;
  show: boolean;
  user: string;
}

const BoardModal = (props: IModalProps) => {
  const { boards, show, user, close } = props;
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
            />
            <InputGroup.Append>
              <Button variant="outline-secondary">Create</Button>
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
};

export default BoardModal;
