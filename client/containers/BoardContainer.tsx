import React, { Component } from 'react';
import Board from '../utils/Board';
import { connect } from 'react-redux';
import BoardModal from '../utils/BoardModal';
import { TAppState } from '../store';

const mapStateToProps = (store: TAppState) => ({
  boardId: store.boards.id,
  boardName: store.boards.name,
  boards: store.boards.boards,
});

type BoardProps = ReturnType<typeof mapStateToProps>;

interface BoardState {
  showModal: boolean;
}

class BoardContainer extends Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.selectBoard = this.selectBoard.bind(this);
  }

  // render modal once it's received all boards as props
  componentWillReceiveProps() {
    if (this.props.boards && this.state.showModal === false) {
      this.setState({ showModal: true });
    }
  }

  selectBoard(id: any) {
    console.log('target', id);
    // console.log('button id', e.target.getAttribute('board-key'));
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        <BoardModal
          show={this.state.showModal}
          boards={this.props.boards}
          selectBoard={this.selectBoard}
        />
        <div className="boardContainer">
          <h1>BOARD - {this.props.boardName}</h1>
          <Board
            boardId={this.props.boardId}
            boardName={this.props.boardName}
          />
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(BoardContainer);
