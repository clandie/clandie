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
        <Column name={'OPPORTUNITIES'} />
        <span className="divider"></span>
        <Column name={'APPLIED'} />
        <span className="divider"></span>
        <Column name={'INTERVIEWS'} />
        <span className="divider"></span>
        <Column name={'OFFERS'} />
        <span className="divider"></span>
        <Column name={'REJECTED'} />
      </div>
    );
  }
}

export default Board;
