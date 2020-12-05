import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface IDeleteModalProps {
  boardId: number | null;
  name: string | null;
  show: boolean;
  close: () => void;
  deleteBoard: (boardId: number) => void;
}

class DeleteBoardModal extends Component<IDeleteModalProps> {
  constructor(props: IDeleteModalProps){
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
  }


  handleDelete (boardId: number) {
    this.props.deleteBoard(boardId);
    this.props.close();
  }

  handleCancelDelete () {
    this.props.close();
  }

  render(){
    return (
      <Modal
        className="deleteBoardModal"
        show={this.props.show}
        onHide={this.props.close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            Delete {this.props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-content">
          Are you sure you want to delete {this.props.name} and all of its contents?
          {/* <br /> */}
          <div className="modal-btns">
            <Button
              className="cancel-btn"
              onClick={this.handleCancelDelete}
            >Cancel</Button>
            <Button
              className="delete-btn"
              onClick={(e: any) => {
                if(this.props.boardId) this.handleDelete(this.props.boardId);
              }}
            >Delete Permanently</Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default DeleteBoardModal;