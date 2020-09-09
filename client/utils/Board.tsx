import React, { Component } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

interface IBoardProps {
  boardId: number;
  boardName: string;
  allJobs:
    | {
        _id: number;
        status: string;
        company: string;
        title: string;
        location: string | null;
        notes: string | null;
        salary: string | null;
        url: string | null;
      }[]
    | [];
  open: (e: any) => void;
  getJob: (boardId: number) => void;
  details: (jobId: number) => void;
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
    const { boardId, boardName } = this.props;
    if (boardId) this.props.getJob(this.props.boardId);

    //once board mounts, update id and name
    this.setState({
      id: boardId,
      name: boardName,
    });
  }

  onDragEnd = (result: any) => {
    // TODO: reordering logic
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  };

  // render each column
  render() {
    const { open, allJobs, details } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board">
          <Column
            name={'opportunities'}
            open={open}
            allJobs={allJobs}
            details={details}
          />
          <span className="divider"></span>
          <Column
            name={'applied'}
            open={open}
            allJobs={allJobs}
            details={details}
          />
          <span className="divider"></span>
          <Column
            name={'interviews'}
            open={open}
            allJobs={allJobs}
            details={details}
          />
          <span className="divider"></span>
          <Column
            name={'offers'}
            open={open}
            allJobs={allJobs}
            details={details}
          />
          <span className="divider"></span>
          <Column
            name={'rejected'}
            open={open}
            allJobs={allJobs}
            details={details}
          />
        </div>
      </DragDropContext>
    );
  }
}

export default Board;
