import React, { Component } from 'react';
import Board from '../utils/Board';
import { connect } from 'react-redux';
import BoardModal from '../utils/BoardModal';
import { TAppState } from '../store';
import * as actions from '../actions/boardActions';
import * as types from '../constants/types';

const mapStateToProps = (store: TAppState) => ({
  boardId: store.boards.id,
  boardName: store.boards.name,
  boards: store.boards.boards,
});

const mapDispatchToProps = (dispatch: any) => ({
  setBoard: (boardObj: types.IBoardInfo) => {
    console.log('dispatched set board', boardObj);
    dispatch(actions.setBoard(boardObj));
  },
});

type BoardProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

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

  selectBoard(id: number, name: string) {
    const boardObj: types.IBoardInfo = {
      id: id,
      name: name,
    };
    this.props.setBoard(boardObj);
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
