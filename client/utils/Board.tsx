import React, { Component } from 'react';
import Column from './Column';

interface IBoardProps {
  boardId: number | null;
  boardName: string;
  open: (e: any) => void;
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
        <Column name={'opportunities'} open={open} />
        <span className="divider"></span>
        <Column name={'applied'} open={open} />
        <span className="divider"></span>
        <Column name={'interviews'} open={open} />
        <span className="divider"></span>
        <Column name={'offers'} open={open} />
        <span className="divider"></span>
        <Column name={'rejected'} open={open} />
      </div>
    );
  }
}

export default Board;
