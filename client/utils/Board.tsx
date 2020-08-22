import React, { Component } from 'react';
import Column from './Column';

interface IBoardProps {
  boardId: number | null;
  boardName: string;
  open: () => void;
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
    const { open } = this.props;
    return (
      <div className="board">
        <Column name={'OPPORTUNITIES'} open={open} />
        <span className="divider"></span>
        <Column name={'APPLIED'} open={open} />
        <span className="divider"></span>
        <Column name={'INTERVIEWS'} open={open} />
        <span className="divider"></span>
        <Column name={'OFFERS'} open={open} />
        <span className="divider"></span>
        <Column name={'REJECTED'} open={open} />
      </div>
    );
  }
}

export default Board;
