import React, { Component } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import * as types from '../constants/types';

interface IBoardProps {
  boardId: number;
  boardName: string;
  allJobs: types.IJobs[] | [];
  columns: any;
  open: (e: any) => void;
  getJob: (boardId: number) => void;
  details: (jobId: number) => void;
  updateStatus: (jobId: number, status: string) => void;
  updateJobs: (allJobs: any[]) => void;
  setColumns: (allJobs: any[]) => void;
  updateColumns: (jobs: types.IJobs[]) => void;
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
     // clone columns for dnd
    const sourceCopy = _.cloneDeep(columns[source.droppableId]);
    const destinationCopy = _.cloneDeep( columns[destination.droppableId]);

    // function that removes card from original column and rearranges affected elements
    const removeCard = (arr: types.IJobs[], index: number) => {
      for (let i = index; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
        arr[i].list_order = i;
      }
      arr.pop();
      return arr;
    };

    // function that inserts card into new column and rearranges affected elements
    const insertCard = (arr: types.IJobs[], index: number, obj: types.IJobs) => {
      obj.list_order = index;
      obj.status = destination.droppableId;
      for (let i = arr.length; i >= index; i--) {
        if (i === index) {
          arr[i] = obj;
        } else {
          arr[i] = arr[i - 1];
          arr[i].list_order = i;
        }
      }
      return arr;
    };

    const jobCard = sourceCopy[source.index];
    console.log('job card', jobCard);
    removeCard(sourceCopy, source.index);
    insertCard(destinationCopy, destination.index, jobCard);

    // should now have updated columns array
    console.log('sourceCopy', sourceCopy);
    //! index is buggy?
    console.log('dest copy', destinationCopy);
    
    // update allJobs array with new columns
    const jobsCopy = _.cloneDeep(allJobs);
    const combined = sourceCopy.concat(destinationCopy);
    let newJobsArr = [];
    for (let i = 0; i < jobsCopy.length; i++) {
      for (let j = 0; j < combined.length; j++)  {
        if (combined[j]._id === jobsCopy[i]._id) {
          newJobsArr.push(combined[j]);
          break;
        } else if (j === combined.length - 1) {
          newJobsArr.push(jobsCopy[i])
        }
      }
    }
    console.log('before', jobsCopy)
    console.log('after', newJobsArr)

    // set columns and update jobs in state
    setColumns(newJobsArr);
    updateJobs(newJobsArr);

    // update status in db if placed in different column
    if (destination.droppableId !== source.droppableId) {
      this.props.updateStatus(draggableId, destination.droppableId);
      this.props.updateColumns(
        newJobsArr
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
