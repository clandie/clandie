import React, { Component } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import * as types from '../constants/types';
import { ColumnState } from '../constants/stateTypes';

interface IBoardProps {
  boardId: number;
  boardName: string;
  allJobs: types.IJobs[] | [];
  columns: ColumnState;
  open: (e: any) => void;
  getJob: (boardId: number) => void;
  details: (jobId: number) => void;
  updateStatus: (jobId: number, status: string) => void;
  updateJobs: (allJobs: any[]) => void;
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

  // TODO: need to retype result
  onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    // if no destination or if dropped in same location, return
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // update state before updating db
    const { allJobs, updateJobs } = this.props;
    // using lodash to deep clone allJobs array
    const copy = _.cloneDeep(allJobs);
    for (let i = 0; i < copy.length; i++) {
      if (copy[i]._id === draggableId) {
        copy[i].status = destination.droppableId;
      }
    }
    updateJobs(copy);

    // update in database
    this.props.updateStatus(draggableId, destination.droppableId);
  };

  // render each column
  render() {
    const { open, allJobs, details, columns } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board">
          <Column
            name={'opportunities'}
            open={open}
            allJobs={allJobs}
            details={details}
            column={columns.opportunities}
          />
          <span className="divider"></span>
          <Column
            name={'applied'}
            open={open}
            allJobs={allJobs}
            details={details}
            column={columns.applied}
          />
          <span className="divider"></span>
          <Column
            name={'interviews'}
            open={open}
            allJobs={allJobs}
            details={details}
            column={columns.interviews}
          />
          <span className="divider"></span>
          <Column
            name={'offers'}
            open={open}
            allJobs={allJobs}
            details={details}
            column={columns.offers}
          />
          <span className="divider"></span>
          <Column
            name={'rejected'}
            open={open}
            allJobs={allJobs}
            details={details}
            column={columns.rejected}
          />
        </div>
      </DragDropContext>
    );
  }
}

export default Board;
