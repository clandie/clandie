import * as React from 'react';
import Board from '../utils/Board';

const BoardContainer: React.FC = () => {
  return (
    <div className="boardContainer">
      <h1>BOARD</h1>
      <Board />
    </div>
  );
};

export default BoardContainer;
