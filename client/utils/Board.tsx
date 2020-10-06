import React, { Component } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import * as types from '../constants/types';
// import { ColumnState } from '../constants/stateTypes';

interface IBoardProps {
  boardId: number;
  boardName: string;
  allJobs: types.IJobs[] | [];
  // columns: ColumnState;
  columns: any;
  open: (e: any) => void;
  getJob: (boardId: number) => void;
  details: (jobId: number) => void;
  updateStatus: (jobId: number, status: string) => void;
  updateJobs: (allJobs: any[]) => void;
  setColumns: (allJobs: any[]) => void;
  updateColumns: (
    source: any[],
    destination: any[],
    sourceIdx: number,
    destinationIdx: number,
    sourceName: string,
    destinationName: string
  ) => void;
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
    console.log('result', result);
    // update state before updating db
    const { columns, allJobs, updateJobs, setColumns } = this.props;
    // using lodash to deep clone allJobs array
    const copy = _.cloneDeep(allJobs);
    for (let i = 0; i < copy.length; i++) {
      if (copy[i]._id === draggableId) {
        copy[i].status = destination.droppableId;
        copy[i].list_order = destination.index;
      }
    }
    // updates ColumnState using SET_COLUMNS - redux state only;
    setColumns(copy);
    // updates JobState using GET_JOB - redux state only;
    updateJobs(copy);

    //column info - arrays of previous state, prev index, new index
    console.log(
      'columns',
      columns[destination.droppableId],
      columns[source.droppableId],
      source.index,
      destination.index
    );

    // update status in db if placed in different column
    if (destination.droppableId !== source.droppableId) {
      this.props.updateStatus(draggableId, destination.droppableId);
      this.props.updateColumns(
        columns[source.droppableId],
        columns[destination.droppableId],
        source.index,
        destination.index,
        source.droppableId,
        destination.droppableId
      );
    }

    //update list order - need to figure out how to update list orders for other jobs that are affected
  };

  // render each column
  render() {
    const { open, details, columns } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board">
          <Column
            name={'opportunities'}
            open={open}
            details={details}
            column={columns.opportunities}
            // allJobs={allJobs}
            // updateStatus={updateStatus}
            // updateJobs={updateJobs}
            // setColumns={setColumns}
          />
          <span className="divider"></span>
          <Column
            name={'applied'}
            open={open}
            details={details}
            column={columns.applied}
            // allJobs={allJobs}
            // updateStatus={updateStatus}
            // updateJobs={updateJobs}
            // setColumns={setColumns}
          />
          <span className="divider"></span>
          <Column
            name={'interviews'}
            open={open}
            details={details}
            column={columns.interviews}
            // allJobs={allJobs}
            // updateStatus={updateStatus}
            // updateJobs={updateJobs}
            // setColumns={setColumns}
          />
          <span className="divider"></span>
          <Column
            name={'offers'}
            open={open}
            details={details}
            column={columns.offers}
            // allJobs={allJobs}
            // updateStatus={updateStatus}
            // updateJobs={updateJobs}
            // setColumns={setColumns}
          />
          <span className="divider"></span>
          <Column
            name={'rejected'}
            open={open}
            details={details}
            column={columns.rejected}
            // allJobs={allJobs}
            // updateStatus={updateStatus}
            // updateJobs={updateJobs}
            // setColumns={setColumns}
          />
        </div>
      </DragDropContext>
    );
  }
}

export default Board;
