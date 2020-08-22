import React, { Component } from 'react';
import Column from './Column';

interface IBoardProps {
  boardId: number;
  boardName: string;
  allJobs: { status: string; company: string; title: string }[] | [];
  open: (e: any) => void;
  getJob: (boardId: number) => void;
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
    this.props.getJob(this.props.boardId);

    const { boardId, boardName } = this.props;
    //once board mounts, update id and name
    this.setState({
      id: boardId,
      name: boardName,
    });
  }

  // render each column
  render() {
    const { open, allJobs } = this.props;
    return (
      <div className="board">
        <Column name={'opportunities'} open={open} allJobs={allJobs} />
        <span className="divider"></span>
        <Column name={'applied'} open={open} allJobs={allJobs} />
        <span className="divider"></span>
        <Column name={'interviews'} open={open} allJobs={allJobs} />
        <span className="divider"></span>
        <Column name={'offers'} open={open} allJobs={allJobs} />
        <span className="divider"></span>
        <Column name={'rejected'} open={open} allJobs={allJobs} />
      </div>
    );
  }
}

export default Board;
