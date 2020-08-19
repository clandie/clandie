import * as React from 'react';
import Board from '../utils/Board';
import { connect } from 'react-redux';

// import * as actions from '../actions/userActions';
// import * as types from '../constants/types';
import { TAppState } from '../store';

const mapStateToProps = (store: TAppState) => ({
  boardId: store.boards.id,
  boardName: store.boards.name,
});

type BoardProps = ReturnType<typeof mapStateToProps>;

const BoardContainer = (props: BoardProps) => {
  return (
    <div className="boardContainer">
      <h1>BOARD - {props.boardName}</h1>
      <Board boardId={props.boardId} boardName={props.boardName} />
    </div>
  );
};

export default connect(mapStateToProps)(BoardContainer);
