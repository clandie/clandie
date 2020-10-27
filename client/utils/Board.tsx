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
  updateListOrder: (jobs: types.IJobs[]) => void;
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
    console.log('result', result);

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
    if (destination.droppableId !== source.droppableId) {
      removeCard(sourceCopy, source.index);
      insertCard(destinationCopy, destination.index, jobCard);  
    } else {
      // if card is dropped in the same column, use the source array
      removeCard(sourceCopy, source.index);
      insertCard(sourceCopy, destination.index, jobCard)
    }
    
    // should now have updated columns array
    console.log('sourceCopy', sourceCopy);
    console.log('dest copy', destinationCopy);
    
    // update allJobs array with new columns
    const jobsCopy = _.cloneDeep(allJobs);
    let combined;
    // if being dropped in the same column use only source array, otherwise combine
    if (destination.droppableId === source.droppableId) {
      combined = sourceCopy;
    } else {
      combined = sourceCopy.concat(destinationCopy);
    }
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
  
    // set columns and update jobs in state
    setColumns(newJobsArr);
    updateJobs(newJobsArr);

    // update status in db if placed in different column
    if (destination.droppableId !== source.droppableId) {
      this.props.updateStatus(draggableId, destination.droppableId);
      this.props.updateListOrder(newJobsArr)
    } else {
      // update only list order if placed in same column
      this.props.updateListOrder(newJobsArr)
    }

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
          />
          <Column
            name={'applied'}
            open={open}
            details={details}
            column={columns.applied}
          />
          <Column
            name={'interviews'}
            open={open}
            details={details}
            column={columns.interviews}
          />
          <Column
            name={'offers'}
            open={open}
            details={details}
            column={columns.offers}
          />
          <Column
            name={'rejected'}
            open={open}
            details={details}
            column={columns.rejected}
          />
        </div>
      </DragDropContext>
    );
  }
}

export default Board;
