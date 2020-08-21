import React, { Component } from 'react';
import Board from '../utils/Board';
import { connect } from 'react-redux';
import BoardModal from '../utils/BoardModal';
import { TAppState } from '../store';
import * as actions from '../actions/boardActions';
import * as userActions from '../actions/userActions';
import * as types from '../constants/types';
import { Button } from 'react-bootstrap';

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
  clearBoard: () => {
    console.log('dispatched clear board');
    dispatch(actions.clearBoard());
  },
  clearUserInfo: () => {
    console.log('dispatched clear info');
    dispatch(userActions.clearUserInfo());
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
    this.handleSignout = this.handleSignout.bind(this);
  }

  // render modal if board name isn't set
  componentDidMount() {
    if (this.props.boardName === null) this.setState({ showModal: true });
  }

  selectBoard(id: number, name: string) {
    const boardObj: types.IBoardInfo = {
      id: id,
      name: name,
    };
    this.props.setBoard(boardObj);
    this.setState({ showModal: false });
  }

  handleSignout() {
    this.props.clearUserInfo();
    this.props.clearBoard();
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
          <div className="boardHeader">
            <h1>{this.props.boardName}</h1>
            <Button className="sign-out" onClick={this.handleSignout}>
              Sign Out
            </Button>
          </div>

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
