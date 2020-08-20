import React, { Component } from 'react';
import Column from './Column';

interface IBoardProps {
  boardId: number | null;
  boardName: string;
}

interface IBoardState {
  id: number | null;
  name: string | null;
}

class Board extends Component<IBoardProps, IBoardState> {
  constructor(props: IBoardProps) {
    super(props);

    this.state = {
      id: null,
      name: null,
    };
  }

  componentDidMount() {
    //once board mounts, update id and name
    this.setState({
      id: this.props.boardId,
      name: this.props.boardName,
    });
  }

  // render each column
  render() {
    return (
      <div className="board">
        <Column name={'opportunities'} />
        <Column name={'applied'} />
        <Column name={'interviews'} />
        <Column name={'offers'} />
        <Column name={'rejected'} />
      </div>
    );
  }
}

export default Board;
